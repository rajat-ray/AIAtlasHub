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
