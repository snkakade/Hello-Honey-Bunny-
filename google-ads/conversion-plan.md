# Conversion Plan

## Campaign primary conversions

- Campaigns 1-3: `batch_request_handoff`
- Campaign 4: `b2b_enquiry_handoff`

These should be configured as primary Google Ads conversions only after the website events are implemented and verified.

## Secondary measurement events

- `whatsapp_click`
- `tel_click`
- `batch_request_started`
- `farm_visit_interest`

Generic WhatsApp clicks must remain secondary and must not be treated as qualified leads.

## Required event parameters

Use only non-personal context:

- `page_path`
- `page_type`
- `product_id`
- `product_name`
- `cta_name`
- `cta_location`
- `contact_method`
- `lead_type`
- `service_area_context`
- `form_type`

Never send names, phone numbers, email addresses, full addresses, medical information, WhatsApp message text or free-text notes to GA4.

## Tracking audit finding

The current site fires `whatsapp_click` for generic WhatsApp links and then also fires `generate_lead` for the same generic click. This overstates qualified leads. The batch request form calls `generate_lead` after successful validation, but does not yet emit the requested `batch_request_handoff` event. The B2B form does not yet expose a verified `b2b_enquiry_handoff` event in the central analytics helper.

No tracking code was changed in this task because the user requested campaign drafts only. Before any campaign is enabled:

1. Stop mapping generic WhatsApp clicks to `generate_lead`.
2. Emit `batch_request_started` once when meaningful interaction begins.
3. Emit `batch_request_handoff` once after the validated consumer request is prepared and WhatsApp handoff begins.
4. Emit `b2b_enquiry_handoff` once after the validated business enquiry is prepared and its chosen handoff begins.
5. Keep `whatsapp_click` and `tel_click` secondary.
6. Verify one user action produces one event in GA4 DebugView and Tag Assistant.
7. Import only the two qualified handoff events into Google Ads as primary conversions.

Do not use Maximize conversions or Target CPA until qualified event attribution is reliable.
