"""Delivery-wording rules applied to product descriptions.

Free delivery = standard-size items, Klang Valley only, orders above RM1,500, T&C apply.
Pods and safes never get free delivery (heavy / bulky -> transport charge).
Used by build_data.py and can be run on its own against src/data/catalog.json.
"""
import json, re, pathlib

POD_DEPT = "office-phone-booth-open-pods"
SAFE_DEPT = "security-safe-box"

def apply(body: str, name: str, dept: str) -> str:
    if dept == POD_DEPT:
        if re.match(r"\s*ace\b", name, re.I):
            new = "Delivery: RM400 per trip within Klang Valley (not free). Other areas have different charges"
        else:
            new = "Delivery: Transport charge applies (not free), quoted per order"
        body = re.sub(r"Delivery: Free Delivery within Klang Valley", new, body)
    elif dept == SAFE_DEPT:
        body = body.replace(
            "<li>Free within Klang Valley</li><li>Delivery charges will be applied outside of Klang Valley</li>",
            "<li>Transport charges apply for safes (not free) and are quoted per order. Please contact us for a quote.</li>",
        )
    else:
        body = body.replace(
            "free delivery and installation within Klang Valley</strong>",
            "free delivery and installation within Klang Valley</strong> (T&amp;C apply)",
        )
    return body

if __name__ == "__main__":
    f = pathlib.Path(__file__).resolve().parent.parent / "src/data/catalog.json"
    data = json.load(open(f))
    n = 0
    for p in data:
        h = apply(p["html"], p["name"], p["dept"])
        if h != p["html"]:
            p["html"] = h
            n += 1
    json.dump(data, open(f, "w"), ensure_ascii=False, separators=(",", ":"))
    print("updated", n)
