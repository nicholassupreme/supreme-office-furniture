"""Turn the raw supreme.com.my extraction into the data files the site uses.

Inputs (data/): supreme-catalogue.json, collections-leaf.json, taxonomy.json
Outputs: src/data/catalog.json (full product data, server-only)
         public/search-index.json (slim, loaded by the client for search/filter)
"""
import json, re, html, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
raw = json.load(open(ROOT / "data/supreme-catalogue.json"))
leaf = json.load(open(ROOT / "data/collections-leaf.json"))
tax = json.load(open(ROOT / "data/taxonomy.json"))

sub_to_dept = {}
sub_order = {}
for di, d in enumerate(tax):
    for si, (s, _n) in enumerate(d["subs"]):
        sub_to_dept[s] = d["slug"]
        sub_order[s] = (di, si)

# Product index -> leaf collections
member = collections.defaultdict(list)
for col, idxs in leaf.items():
    for i in idxs:
        member[i].append(col)

# Fallback: map the store's own primary category to a department
CAT_TO_DEPT = {
    "Office Work Chairs": "office-work-chairs-malaysia", "Visitor Office Chairs": "office-work-chairs-malaysia",
    "Training & Classroom Chairs": "office-work-chairs-malaysia", "Cafe & Banquet Chairs": "office-work-chairs-malaysia",
    "Ergonomic Work Chairs": "office-work-chairs-malaysia", "Bar Stools": "office-work-chairs-malaysia",
    "Office Wooden Storage": "office-wooden-storage", "Steel Storage": "steel-storage",
    "Office & School Equipments": "office-school-equipments", "Meeting/Conference Table": "meeting-conference-table",
    "Link Chairs & Waiting Benches": "office-sofas-bench-seating-malaysia",
    "Office Sofas & Bench Seating": "office-sofas-bench-seating-malaysia", "Security Safe Box": "security-safe-box",
    "Standard Office Desk": "office-desks-tables", "Director's Desk": "office-desks-tables",
    "L-Shape Office Table": "office-desks-tables",
}

def chair_sub(name):
    n = name.lower()
    if re.search(r"high back|director|executive|presidential", n):
        return "director-high-back-office-chairs-malaysia"
    if re.search(r"low back|medium back|mid back", n):
        return "medium-low-back-office-chairs-malaysia"
    return None

def clean_html(h):
    if not h:
        return ""
    h = re.sub(r"<link[^>]*>", "", h)
    h = re.sub(r"</?(div|span|font|section)>", "", h)
    h = h.replace("&nbsp;", " ")
    h = re.sub(r"<p>\s*(<br>)?\s*</p>", "", h)
    h = re.sub(r"<li>\s*<p>(.*?)</p>\s*</li>", r"<li>\1</li>", h, flags=re.S)
    h = re.sub(r"<img[^>]*>", "", h)  # gallery images are shown separately
    # point old-store links at the same paths on the new site
    h = re.sub(r'href="https?://(www\.)?supreme\.com\.my', 'href="', h)
    return re.sub(r"\s+", " ", h).strip()

def plain(h, n=180):
    t = html.unescape(re.sub(r"<[^>]+>", " ", h))
    t = re.sub(r"\s+", " ", t).strip()
    return (t[: n - 1].rsplit(" ", 1)[0] + "…") if len(t) > n else t

def opt_name(k):
    return {"https://schema.org/color": "Colour", "https://schema.org/size": "Size",
            "https://schema.org/material": "Material"}.get(k, k)

def num(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None

products, stats = [], collections.Counter()
for i, p in enumerate(raw):
    if (p["name"] or "").startswith("Standard Table (MIX7)"):
        member[i] = member.get(i, []) + ["standard-office-desk"]
    subs = sorted(set(member.get(i, [])), key=lambda s: sub_order.get(s, (99, 99)))
    subs = [s for s in subs if s in sub_to_dept]
    in_pod_dept = "office-phone-booth-open-pods" in member.get(i, [])
    if not subs and re.search(r"banquet|designer chair|plastic (arm )?chair|cafe", (p["name"] or "").lower()):
        subs = ["cafe-banquet-chairs"]
    if not subs:
        nm = (p["name"] or p["title"] or "").lower()
        if "lounge chair" in nm:
            subs = ["lounge-chairs-benches"]
        elif "visitor" in nm:
            subs = ["visitor-office-chairs-malaysia"]
        elif "chair" in nm and chair_sub(nm):
            subs = [chair_sub(nm)]
    if in_pod_dept:
        dept = "office-phone-booth-open-pods"
    elif subs:
        dept = sub_to_dept[subs[0]]
    else:
        dept = CAT_TO_DEPT.get(p["category"])
        if dept is None and "chair" in (p["name"] or "").lower():
            dept = "office-work-chairs-malaysia"
    if dept is None:
        stats["no_dept"] += 1
        dept = "office-school-equipments"
    variants = []
    for v in p["variants"]:
        variants.append({"opts": {opt_name(k): val for k, val in v["opts"].items()},
                         "price": num(v["price"]), "image": v.get("image")})
    prices = [v["price"] for v in variants if v["price"]] or ([num(p["price"])] if num(p["price"]) else [])
    images = list(dict.fromkeys(p["images"]))
    body = clean_html(p["descHtml"])
    products.append({
        "slug": p["slug"].strip("/"),
        "name": (p["title"] or p["name"]).strip(),
        "dept": dept,
        "subs": subs,
        "price": min(prices) if prices else None,
        "priceMax": max(prices) if prices else None,
        "images": images,
        "options": [opt_name(k) for k in p["variesBy"]],
        "variants": variants,
        "html": body,
        "summary": plain(body),
        "made_to_order": "workstation" in dept or "negotiable" in " ".join(subs),
        "featured": p["category"] == "Feature on homepage",
    })
    stats["subs_" + ("yes" if subs else "no")] += 1

# Mark products featured on the old homepage first in their collections? Keep store order.
out = ROOT / "src/data"
out.mkdir(parents=True, exist_ok=True)
json.dump(products, open(out / "catalog.json", "w"), ensure_ascii=False, separators=(",", ":"))

index = [{"s": p["slug"], "n": p["name"], "d": p["dept"], "c": p["subs"], "p": p["price"],
          "m": p["priceMax"], "i": p["images"][0] if p["images"] else None} for p in products]
pub = ROOT / "public"
json.dump(index, open(pub / "search-index.json", "w"), ensure_ascii=False, separators=(",", ":"))

dept_counts = collections.Counter(p["dept"] for p in products)
sub_counts = collections.Counter(s for p in products for s in p["subs"])
json.dump({"dept": dept_counts, "sub": sub_counts}, open(out / "counts.json", "w"))
print(len(products), dict(stats))
print(dept_counts.most_common())
print("subs with 0:", [s for s in sub_to_dept if not sub_counts.get(s)])
print("catalog MB", round((out / "catalog.json").stat().st_size / 1e6, 2),
      "index KB", round((pub / "search-index.json").stat().st_size / 1e3))
