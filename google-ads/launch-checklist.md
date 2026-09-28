# Draft Verification and Future Launch Checklist

## Before posting Editor changes

- Confirm account `678-061-1560` is the intended Hello Honey Bunny account.
- Confirm all four campaigns and all child entities are paused.
- Confirm total proposed budget is INR 500 per day.
- Confirm Search Partners and Display Network are off.
- Confirm language is English.
- Confirm only exact and phrase match keywords exist.
- Confirm AI Max, broad match expansion and automatically created claims are off.
- Confirm presence-only location targeting.
- Resolve localities only when Google identifies the intended Pune or PCMC place.
- Reject location suggestions outside the six published delivery corridors.
- Confirm Campaign 1 uses `/try-goat-milk`.
- Confirm auto-tagging remains enabled and final URL suffixes contain no PII.
- Confirm all ads avoid health, certification, guaranteed-delivery and unsupported product claims.

## Conversion gate

- Verify `batch_request_handoff` in GA4 DebugView.
- Verify `b2b_enquiry_handoff` in GA4 DebugView.
- Confirm generic `whatsapp_click` is secondary.
- Confirm a single action produces one event.
- Import the qualified handoff events to Google Ads.
- Confirm the correct primary conversion is selected for each campaign.

## Suggested activation sequence, not authorised by this package

- Week 1: consider Campaign 1 only after tracking is verified.
- Week 2: consider Campaign 2 only after Campaign 1 search terms are clean.
- Weeks 3-4: evaluate Campaign 3.
- Campaign 4: consider only after B2B event tracking is verified.

Do not automatically execute this sequence. Move from Maximize clicks to Maximize conversions only after reliable attribution and roughly 15-30 genuine primary conversions in a rolling month. This is an internal testing guideline, not a Google requirement.

## Explicit safety state

- All campaign drafts remain paused.
- No campaign has been published or enabled.
- No billing settings have been changed.
- No ad spend has been initiated.
