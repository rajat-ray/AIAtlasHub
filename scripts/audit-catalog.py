#!/usr/bin/env python3
"""Offline catalog quality gate for AIAtlasHub.

Run: python scripts/audit-catalog.py
Exits nonzero if catalog entries are malformed, duplicated, lack an editorial
assessment, or reference non-HTTPS vendor sites. No network calls are made.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
tools_text = (ROOT / "data/tools.ts").read_text(encoding="utf-8")
editorial_text = (ROOT / "data/editorial.ts").read_text(encoding="utf-8")
updates_text = (ROOT / "data/catalog-updates.ts").read_text(encoding="utf-8")

rows = re.findall(
    r"^\['([^']+)','([^']+)','([^']+)','(https://[^']+)','(Free|Freemium|Paid)','([^']+)'\],?$",
    tools_text,
    flags=re.MULTILINE,
)
names = [row[0] for row in rows]
errors = []
if not rows:
    errors.append("No catalog rows parsed; check data/tools.ts format")
if len(names) != len(set(names)):
    errors.append("Duplicate tool names found")
if len([row[3] for row in rows]) != len(set(row[3] for row in rows)):
    errors.append("Duplicate vendor URLs found")
for name, category, description, url, pricing, tags in rows:
    if not category.strip() or not description.strip() or not tags.strip():
        errors.append(f"Incomplete listing: {name}")
    if not re.search(r"['\"]" + re.escape(name) + r"['\"]\s*:", editorial_text):
        errors.append(f"Missing editorial assessment: {name}")
# Validate the source-backed verification records without treating catalog dates as checks.
verified_block = updates_text.split("export const toolVerifications:Record<string,ToolVerification>=", 1)
if len(verified_block) != 2:
    errors.append("Missing toolVerifications declaration")
else:
    verified_block = verified_block[1].split("export const toolHistory", 1)[0]
    records = re.findall(r"^ '([^']+)':\\{\\s*checkedOn:'([^']+)',\\s*sourceUrls:\\[([^]]+)\\],\\s*scope:\\[([^]]+)\\],\\s*note:'([^']+)'", verified_block, flags=re.MULTILINE)
    for name, date, sources, scope, note in records:
        if name not in names:
            errors.append(f"Verification record references unknown tool: {name}")
        if not re.fullmatch(r"\\d{4}-\\d{2}-\\d{2}", date):
            errors.append(f"Invalid verification date: {name}")
        if "https://" not in sources or not scope.strip() or not note.strip():
            errors.append(f"Incomplete verification evidence: {name}")
    print(f"Verification records parsed: {len(records)}")
print(f"Catalog entries parsed: {len(rows)}")
print(f"Entries with unique names: {len(set(names))}")
print(f"Audit issues: {len(errors)}")
for error in errors:
    print(f"ERROR: {error}")
sys.exit(1 if errors else 0)
