# AIAtlasHub editorial intake and review policy

AIAtlasHub is an independent discovery directory. Submission is free and does not guarantee acceptance, editorial endorsement, ranking or placement. We do not publish invented test results, fabricated ratings or copied directory descriptions.

## Intake

1. Review incoming **Suggest an AI tool** issues for an official product URL, clear use case, appropriate category and publicly supportable claims.
2. Check for duplicates in `data/tools.ts` (including alternative brand spellings and canonical URLs).
3. Verify the official domain and basic availability. Do not automatically fetch or execute third-party content based solely on an issue.
4. Check product descriptions, pricing and relevant security/privacy claims against vendor documentation. Where verification is incomplete, describe the claim as unverified or omit it.
5. Write an original, concise listing description. Do not reuse submitted marketing copy verbatim.
6. Add a qualitative review to `data/editorial.ts` only when strengths, trade-offs and buying checks can be responsibly supported. Never claim hands-on testing unless it occurred and is documented.
7. Update `data/tools.ts`, category content if needed, and the editorial coverage. Run `python scripts/audit-catalog.py`, `npx tsc --noEmit`, and `npm run build` before merging.
8. Review deployment smoke checks and sitemap coverage after deployment.

## Correction requests

Prefer official product documentation for factual corrections. Record the changed fields in the pull request or commit, link to evidence, and close the correction issue with a concise explanation. Avoid collecting personal information in public GitHub issues.

## Disclosures and governance

- Submitter affiliation does not determine ranking or acceptance.
- Paid placement is not currently part of this editorial intake. If introduced, it must be clearly labelled and separated from independent assessments.
- Pricing labels are indicative; feature availability and terms can change.
- No automatic publishing from public issues. A maintainer reviews every catalog change.
- Product metadata and editorial copy are maintained in version control with an auditable commit history.

## Review checklist

- [ ] Official URL and product identity verified
- [ ] No duplicate listing
- [ ] Category and use case appropriate
- [ ] Pricing label checked or clearly qualified
- [ ] Description original and factual
- [ ] No unsupported security, benchmark or performance claims
- [ ] Editorial trade-offs and buying checks included
- [ ] Type check, catalog audit and build pass
- [ ] Public pages and sitemap checked after deployment

## Dated listing revisions and vendor verification

Maintain `data/catalog-updates.ts` when editing a listing. Each `catalogUpdates` record must have the actual editorial change date (ISO YYYY-MM-DD), a concise factual summary, `kind` and the exact affected `toolNames`. Do not backfill historical dates from memory. A site-only change uses `toolNames: []`.

A `toolVerifications` record is separate and must be supported by dated inspection of public authoritative sources. Include `checkedOn`, `sourceUrls`, `scope` and `note`. Only claim verification for the fields actually checked (identity, pricing, capabilities, privacy or security). Do not treat a reachable homepage, prior directory entry or submission claim as a completed verification.

For a listing change without authoritative re-verification, add the catalog update but leave its verification record unchanged. Product detail pages deliberately show "No dated, source-backed verification record" until a check is documented.

Example (replace placeholders with actual checked evidence, never synthetic dates):
```ts
// catalogUpdates: add a record for the real editorial change
{date:'YYYY-MM-DD',title:'Corrected Example Tool category',summary:'Changed category after review of the official product description.',toolNames:['Example Tool'],kind:'catalog'}
// toolVerifications: only after inspecting the actual source on that date
'Example Tool':{checkedOn:'YYYY-MM-DD',sourceUrls:['https://example.com/docs'],scope:['identity','capabilities'],note:'Checked the official product documentation for identity and use case; pricing not checked.'}
```

## Automated vendor URL health scans

The `AIAtlasHub vendor link health` GitHub Actions workflow runs weekly (Monday 02:17 UTC) and on manual dispatch. It executes `python scripts/check-vendor-links.py` and stores JSON and Markdown reports as workflow artifacts for 30 days.

The scanner checks only public URLs already listed in `data/tools.ts`. An HTTP success confirms reachability at the time of the request, **not** the vendor's identity, continued product availability, feature claims or pricing. Redirects should be inspected for changes of ownership, rebranding and product retirement. A 403, 429, timeout or other error is a review signal, not proof of a broken product. Some vendors prohibit or block automated checks.

For each review item: open the vendor's official website manually, corroborate major lifecycle or pricing changes against authoritative sources, update the listing and dated `catalogUpdates` record, and create a `toolVerifications` entry only for fields genuinely checked. Do not automatically remove listings or change pricing based on this report. The workflow intentionally does not fail the main quality gate on transient vendor network errors.


## GitHub-backed verification workflow

1. From `/health#editorial-queue`, choose **Request review** for a specific tool. This opens the public `verify-listing.yml` issue form with a proposed title; the submitter must enter the exact listing URL, scope and authoritative evidence.
2. Maintainers triage the issue, verify that the named tool exists, and request missing sources. Keep the issue open while evidence is incomplete. The `editorial-review` label indicates intake, **not approval**.
3. Propose catalog and editorial changes in a separate pull request using `.github/PULL_REQUEST_TEMPLATE.md`. Link the issue, enumerate checked fields and document each official URL and access date. Update `toolVerifications` only when those checks were actually performed; update `catalogUpdates` only for real catalog changes.
4. The existing quality workflow checks the catalog audit, TypeScript and build on pull requests. A maintainer reviews both evidence and CI results, requests changes where necessary and approves only after the claims are supportable.
5. Merge is a deliberate maintainer action. Close the issue with the merged pull request or a documented rejection. An open issue, submitted PR or label never changes the public verification status.

**Repository settings required for enforced approval:** enable branch protection or a ruleset on `main`, require the quality workflow status check and at least one approving review, and restrict direct pushes. Repository settings are not modified by this documentation; until configured, the approval procedure is editorial policy rather than a technically enforced merge gate.
