#!/usr/bin/env python3
"""Smoke test Cloudflare deployment before submitting sitemap to search engines.

Usage: python scripts/check-public-routes.py
Only checks the AIAtlasHub site; does not crawl third-party sites.
"""
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

BASE = "https://aiatlashub.rajat-ray.workers.dev"
HEADERS = {"User-Agent": "AIAtlasHub-Deployment-Smoke-Test/1.0"}
PATHS = ["/", "/learn", "/updates", "/health", "/compare", "/compare/cursor-vs-github-copilot", "/categories/ai-coding", "/categories/ai-design", "/tools/chatgpt", "/tools/google-ai-studio", "/tools/aider", "/sitemap.xml", "/robots.txt"]


def fetch(path):
    request = urllib.request.Request(BASE + path, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.status, response.read(2_000_000).decode("utf-8", "replace")


def main():
    failed = []
    for path in PATHS:
        try:
            status, body = fetch(path)
            if status != 200 or not body.strip():
                raise ValueError(f"Unexpected HTTP status or empty body: {status}")
            if path.startswith("/tools/") and ("Editorial analysis" not in body or "AIAtlasHub" not in body):
                raise ValueError("Tool detail content not present")
            if path == "/sitemap.xml":
                root = ET.fromstring(body)
                urls = root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url")
                if len(urls) != 124:
                    raise ValueError(f"Expected 124 sitemap URLs, found {len(urls)}")
            print(f"PASS {path} ({status})")
        except (urllib.error.URLError, ValueError, ET.ParseError) as exc:
            failed.append(path)
            print(f"FAIL {path}: {exc}")
    if failed:
        raise SystemExit(f"{len(failed)} route checks failed")
    print("All checks passed. Verify remaining tool URLs before submitting the sitemap.")


if __name__ == "__main__":
    main()
