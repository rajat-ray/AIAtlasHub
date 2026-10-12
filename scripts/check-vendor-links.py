#!/usr/bin/env python3
"""Network-based catalog URL health scan. Observations are NOT vendor verification.

Run: python scripts/check-vendor-links.py
Output: artifacts/vendor-link-health.json and artifacts/vendor-link-health.md
A blocked or timed-out URL is REVIEW, never proof of discontinuation.
"""
import concurrent.futures
import datetime as dt
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "artifacts"
ROWS = re.findall(
    r"^\['([^']+)','[^']+','[^']+','(https://[^']+)','(Free|Freemium|Paid)','[^']+'\],?$",
    (ROOT / "data/tools.ts").read_text(encoding="utf-8"),
    re.MULTILINE,
)
HEADERS = {"User-Agent": "AIAtlasHub-LinkHealth/1.0 (+https://github.com/rajat-ray/AIAtlasHub)", "Accept": "text/html,application/xhtml+xml,*/*;q=0.5"}

def inspect(row):
    name, url, pricing = row
    # HEAD is lightweight, but many sites reject it; fall back to GET.
    result = {"name": name, "url": url, "pricing_label": pricing, "status": "review", "http_status": None, "final_url": None, "reason": ""}
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, headers=HEADERS, method=method)
            with urllib.request.urlopen(req, timeout=12) as response:
                result["http_status"] = response.status
                result["final_url"] = response.geturl()
                result["status"] = "reachable"
                result["reason"] = "HTTP success (does not verify vendor identity, pricing or product availability)"
                return result
        except urllib.error.HTTPError as exc:
            result["http_status"] = exc.code
            result["reason"] = f"HTTP {exc.code} (may reflect bot protection or an obsolete URL)"
            if method == "HEAD" and exc.code in (403, 405, 429, 500, 501, 503):
                continue
            if method == "GET" or exc.code not in (403, 405, 429, 500, 501, 503):
                break
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            result["reason"] = f"Network error: {type(exc).__name__}"
            if method == "GET":
                break
    return result

def main():
    if not ROWS:
        raise SystemExit("No catalog entries parsed")
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(inspect, ROWS))
    results.sort(key=lambda r: (r["status"] == "reachable", r["name"].casefold()))
    stamp = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    OUT.mkdir(parents=True, exist_ok=True)
    report = {"checked_at_utc": stamp, "total": len(results), "reachable": sum(r["status"] == "reachable" for r in results), "needs_review": sum(r["status"] != "reachable" for r in results), "disclaimer": "HTTP reachability is not editorial verification, pricing validation or evidence of product discontinuation.", "results": results}
    (OUT / "vendor-link-health.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    lines = ["# AIAtlasHub vendor URL health scan", "", f"Checked: {stamp}", f"Reachable: {report['reachable']}/{report['total']}", "", "This is a link-health scan, not verification of current pricing, capabilities or ownership. Failed requests require manual review.", "", "| Tool | Result | HTTP | URL |", "| --- | --- | --- | --- |"]
    for item in results:
        safe_name = item["name"].replace("|", "\\|")
        lines.append(f"| {safe_name} | {item['status']} | {item['http_status'] or '—'} | {item['url']} |")
    (OUT / "vendor-link-health.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Checked {report['total']} URLs: {report['reachable']} reachable; {report['needs_review']} need review")
    print("Reports: artifacts/vendor-link-health.json and .md")
    # Network failures must not block publishing; investigate results manually.

if __name__ == "__main__":
    main()
