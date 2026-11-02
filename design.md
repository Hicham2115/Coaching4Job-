# Coaching 4 Job design system

Use this guide for the public site and the owner dashboard. The public site in `app/` is the visual source of truth; dashboard screens should feel like the same brand while making lead management easy to scan.

## Brand foundations

- **Language:** French. Keep labels direct and familiar to a Casablanca-based owner.
- **Logo:** use `public/images/coaching4job-logo.png` on light surfaces and `public/images/coaching4job-logo-transparent.png` on dark surfaces. Do not redraw the full wordmark.
- **Type:** Geist Sans from `app/layout.tsx`. Use bold, tightly tracked headings and readable 14–16 px body text in the dashboard. Reserve uppercase, tracked labels for small section headings.
- **Colors:** ink `#111111`, white `#ffffff`, muted text `#4a4a4a`, soft surface `#f8f8f4`, brand yellow `#fff52d`. The current nav underline is `#fff52e`; either is visually the same accent. Use yellow for a clear action, selected state, or small highlight, not as a large data background.
- **Lines and surfaces:** the site favors thin dark dividers, flat white sections, restrained borders, and very little shadow. Keep that editorial feel in the dashboard. Avoid stacked cards, gradients, glass effects, and decorative charts.
- **Corners:** public calls to action are pill shaped; forms and content panels are mostly square. In the dashboard, use compact, modestly rounded controls where needed for usability, while keeping tables and main panels crisp.
- **Icons:** lucide-react only. Pair ambiguous icons with text and label icon-only controls.

## Dashboard direction

- **Purpose:** help one owner see new conference leads, find a person, and record follow-up progress quickly.
- **Primary screens:** sign in; overview with latest leads and follow-up priorities; searchable lead list; lead detail with contact actions, status, and notes. Keep a small account/sign-out menu in the shell rather than inventing a settings page before one is needed.
- **Navigation:** simple persistent desktop sidebar or top rail with logo and the two main destinations: Vue d’ensemble and Prospects. On mobile, use a compact header and an accessible menu. A lead detail returns clearly to the list.
- **Overview hierarchy:** lead count and new/follow-up counts as quiet summaries, then the recent leads list as the main content. Prioritize the newest uncontacted lead over decorative analytics.
- **Lead list:** show name, situation, submitted date, status, and a clear detail action. Search and status filter sit above the list. Use row dividers rather than a card per lead.
- **Lead detail:** make phone, email, and WhatsApp actions easy to find; show submitted information, current status, and a simple notes history. Distinguish “saved lead” from “WhatsApp message sent,” which the website cannot verify by merely opening WhatsApp.
- **States:** design loading, empty, error, and confirmation states using the same type and color system. Never show real personal data in mockups; use clearly fictional example leads.
- **Responsive:** desktop reference is about 1440 × 1024; mobile reference is about 390 × 844. Keep key actions visible, let tables become readable stacked rows on phones, and avoid horizontal scrolling for essential fields.
- **Accessibility:** visible keyboard focus, explicit labels, readable contrast, 44 px touch targets where practical, and status meaning conveyed by text as well as color.

## Implementation boundary

These design rules describe the visual target. The dashboard images are for review first; they do not imply that login, lead storage, or form submission has been built. When implementation starts, continue the existing Next.js, Tailwind, shadcn, and lucide patterns without adding packages until needed and approved.

## Dashboard images for review

The first-pass desktop screen images are in `design-previews/`: `sign-in.png`, `overview.png`, `prospects.png`, and `prospect-detail.png`. They show fictional data and are visual references, not implemented pages or final copy. Resolve the owner's name, counts, status wording, and any depicted contact details before implementation.
