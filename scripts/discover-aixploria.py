#!/usr/bin/env python3
"""Conservative discovery of public AIxploria listing candidates.

Run manually: python scripts/discover-aixploria.py
This DOES NOT import listings into AIAtlasHub or copy third-party descriptions.
It checks robots.txt, rate-limits requests, collects page titles and URLs only,
and saves a review queue. Review candidate names, official vendor URLs and
licensing before adding original listings to data/tools.ts.
"""
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
from html.parser import HTMLParser
from pathlib import Path

BASE = "https://www.aixploria.com"
PATHS = ["/en/", "/en/categories-ai/", "/en/last-ai/", "/en/free-ai/"]
AGENT = "AIAtlasHubDiscovery/0.1 (+manual editorial research; contact via GitHub)"
OUTPUT = Path("data/discovery-candidates.json")
MAX_REQUESTS = 4
DELAY_SECONDS = 3


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.anchor = None
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.anchor = {"href": dict(attrs).get("href", ""), "text": ""}

    def handle_data(self, data):
        if self.anchor is not None:
            self.anchor["text"] += data

    def handle_endtag(self, tag):
        if tag == "a" and self.anchor is not None:
            self.links.append(self.anchor)
            self.anchor = None


def main():
    robots = urllib.robotparser.RobotFileParser()
    robots.set_url(BASE + "/robots.txt")
    try:
        robots.read()
    except (OSError, urllib.error.URLError) as exc:
        raise SystemExit(f"Robots policy unavailable; refusing to crawl: {exc}")
    results = []
    for path in PATHS[:MAX_REQUESTS]:
        url = urllib.parse.urljoin(BASE, path)
        if not robots.can_fetch(AGENT, url):
            print(f"Robots disallows {url}; skipped")
            continue
        req = urllib.request.Request(url, headers={"User-Agent": AGENT})
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                if "text/html" not in resp.headers.get("Content-Type", ""):
                    continue
                html = resp.read(750_000).decode("utf-8", errors="replace")
        except (urllib.error.URLError, TimeoutError) as exc:
            print(f"Skipping {url}: {exc}")
            continue
        parser = LinkParser()
        parser.feed(html)
        for link in parser.links:
            name = re.sub(r"\s+", " ", link["text"]).strip()
            href = urllib.parse.urljoin(url, link["href"])
            parsed = urllib.parse.urlparse(href)
            if not (2 <= len(name) <= 90):
                continue
            if parsed.scheme not in ("http", "https"):
                continue
            if parsed.netloc not in ("www.aixploria.com", "aixploria.com"):
                continue
            if not parsed.path.startswith("/en/"):
                continue
            results.append({"candidate": name, "source_page": url, "detail_url": href,
                            "status": "unverified", "requires_original_review": True})
        time.sleep(DELAY_SECONDS)
    unique = list({(r["candidate"], r["detail_url"]): r for r in results}.values())
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps({"source": BASE, "review_required": True,
                                  "notes": "Navigation links and candidate titles only; not approved product records.",
                                  "candidates": unique}, indent=2, ensure_ascii=False) + "\n")
    print(f"Saved {len(unique)} unverified candidate links to {OUTPUT}")


if __name__ == "__main__":
    main()
