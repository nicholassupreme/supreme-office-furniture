"""One-off migration: list every Ace pod layout as its own product.

Reads src/data/ace-layouts.json (one entry per layout: slug, model, label, price, photos)
and rewrites the Ace pod entries in src/data/catalog.json, public/search-index.json and
src/data/counts.json. Safe to re-run: it replaces every existing Ace pod entry.
Prices here are the Supreme prices (resellers sit above the Ace website's own prices).
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
layouts = json.load(open(ROOT / "src/data/ace-layouts.json"))
DEPT = "office-phone-booth-open-pods"
PREFIXES = ("ace-uno", "ace-plus", "ace-flex", "ace-meet", "ace-hub")

def name(l):
    m = l["model"]
    if m == "uno": return "Ace Uno Acoustic Office Pod"
    if m == "plus": return "Ace Plus Acoustic Office Pod"
    if m == "duo": return "Ace Flex Duo Acoustic Office Pod"
    if m == "flex": return f"Ace Flex – {l['label']}"
    return f"Ace {m.title()} {l['code']} – {l['label']}"

def summary(l):
    return (l["blurb"] or "Acoustic office pod from Supreme Office, Klang.") 

products = []
for l in layouts:
    l["name"] = f"{name(l)} ({l['seatLabel']})"
    co, io = l["colourOpt"], l["interiorOpt"]
    products.append({
        "slug": l["slug"], "name": l["name"], "dept": DEPT, "subs": [],
        "price": float(l["price"]), "priceMax": float(l["price"]),
        "images": list(dict.fromkeys(l["gallery"])),
        "options": [co, io],
        "variants": [{"opts": {co: c, io: l["interior"][0]}, "price": float(l["price"]), "image": l["colourImages"].get(c)} for c in l["colours"]],
        "html": "", "summary": summary(l), "made_to_order": False, "featured": False,
    })
json.dump(layouts, open(ROOT / "src/data/ace-layouts.json", "w"), indent=1, ensure_ascii=False)

def replace(items, key, make):
    first = next((i for i, x in enumerate(items) if x[key].startswith(PREFIXES)), len(items))
    rest = [x for x in items if not x[key].startswith(PREFIXES)]
    new = [make(p) for p in products]
    return rest[:first] + new + rest[first:]

cat_path = ROOT / "src/data/catalog.json"
cat = json.load(open(cat_path))
cat = replace(cat, "slug", lambda p: p)
json.dump(cat, open(cat_path, "w"), ensure_ascii=False)

si_path = ROOT / "public/search-index.json"
si = json.load(open(si_path))
si = replace(si, "s", lambda p: {"s": p["slug"], "n": p["name"], "d": DEPT, "c": [], "p": p["price"], "m": p["priceMax"], "i": p["images"][0]})
json.dump(si, open(si_path, "w"), ensure_ascii=False, separators=(",", ":"))

cnt_path = ROOT / "src/data/counts.json"
cnt = json.load(open(cnt_path))
cnt["dept"][DEPT] = sum(1 for p in cat if p["dept"] == DEPT)
json.dump(cnt, open(cnt_path, "w"))
print(len(products), "layout products;", DEPT, "now", cnt["dept"][DEPT])
