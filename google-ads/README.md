# Hello Honey Bunny Google Ads Draft Package

This directory contains import-ready Google Ads Editor drafts for the four-campaign pilot. Nothing in this package is enabled, published or connected to billing.

## Draft status

- Every campaign, ad group, keyword and ad is marked `Paused`.
- Proposed combined daily budget: INR 500.
- Search Network only.
- Search Partners off.
- Display Network off.
- English only.
- Exact and phrase match keywords only.
- Bidding draft: Maximize clicks with the documented CPC limits.
- Auto-tagging should remain enabled in the account.

## Landing pages

- Fresh Goat Milk campaign: `https://hellohoneybunny.com/try-goat-milk`
- Delivery campaign: `https://hellohoneybunny.com/delivery-areas`
- Paneer campaign: `https://hellohoneybunny.com/goat-milk-paneer`
- B2B campaign: `https://hellohoneybunny.com/for-chefs-and-retailers`

The first campaign intentionally uses the dedicated noindex paid-search page, not the organic `/fresh-goat-milk` page.

## Files

- `campaigns.csv`: campaign settings, budgets, networks, bidding and UTM suffixes.
- `ad-groups.csv`: nine paused ad groups.
- `keywords.csv`: 79 exact or phrase match keywords.
- `negative-keywords.csv`: shared safety list and campaign-routing negatives.
- `responsive-search-ads.csv`: one paused RSA draft per ad group.
- `locations.csv`: route-locality targets for all four campaigns.
- `sitelinks.csv`: consumer campaign sitelink drafts.
- `callouts.csv`: campaign callout drafts.
- `conversion-plan.md`: primary and secondary conversion design.
- `measurement-plan.md`: commercial measurement model.
- `launch-checklist.md`: import, verification and controlled activation sequence.

## Import into Google Ads Editor

1. Open the correct Google Ads account in Google Ads Editor.
2. Download recent account changes before importing.
3. Import `campaigns.csv`, then `ad-groups.csv`, `keywords.csv`, `responsive-search-ads.csv`, `locations.csv`, `sitelinks.csv` and `callouts.csv` in that order.
4. Use the column-mapping screen to map any locally named budget or targeting fields to the current Editor field names.
5. Import `negative-keywords.csv`. Create the shared list `NEG | HHB | Safety + Irrelevant`, add its 57 entries and attach it to all four campaigns. Apply the campaign-level rows only to the named campaign.
6. Resolve each location using Google's suggested match. Reject ambiguous or unsupported matches; never broaden a failed locality match to Maharashtra or India.
7. Confirm the advanced location option is `People in or regularly in your targeted locations`.
8. Review RSA character limits, policies and final URLs.
9. Confirm every entity still reads `Paused` before posting changes.
10. Do not enter billing or enable a campaign as part of this import.

## Settings that remain manual

- Confirm account auto-tagging is enabled.
- Confirm advanced location targeting is presence only after Editor resolves the locality rows.
- Add the business name asset `Hello Honey Bunny`.
- Add only the existing approved brand logo asset.
- Create or import the qualified GA4 handoff conversions after the tracking defects in `conversion-plan.md` are fixed.
- Assign `batch_request_handoff` to Campaigns 1-3 and `b2b_enquiry_handoff` to Campaign 4 as the campaign-specific primary goal.
- Review Google policy warnings and asset suggestions without accepting automatic expansion, AI Max, broad match or unsupported claims.

## Account access note

Google Ads account `678-061-1560` is currently in the first-campaign onboarding flow and still presents an ad-blocker warning after reload. The standard account workspace is therefore not available for safely holding four paused drafts. These Editor files are the non-publishing fallback specified for this pilot.
