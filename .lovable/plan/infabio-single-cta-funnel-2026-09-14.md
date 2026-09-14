# Infabio single-CTA funnel

## Goal
Build a fast, mobile-first landing page at `/` with one action throughout: **“Book My Free Strategy Call”**. Every CTA scrolls smoothly to the lead form; no navigation links or sitemap distract from conversion.

## Visual direction
- Recreate Infabio’s current brand system: Italiana display headings, Inter body text, near-black navy background, white/slate typography, and indigo-to-soft-pink CTA accents.
- Use the existing Infabio logo as a local optimized asset, plus subtle brand-aligned background texture rather than heavy media.
- Add compact uppercase telemetry labels, thin luminous borders, restrained dark cards, and generous editorial spacing.
- Keep motion lightweight: short fade/slide reveals and count-up stats when visible, with reduced-motion support.

## Page structure
1. Sticky minimal header with logo and the repeated CTA.
2. Hero with the women-powered marketing defence headline, anti-waste positioning, CTA, and animated 50+ / 40% / 12x stat strip.
3. “Drift vs Armor” comparison with muted red failure signals and accent success signals.
4. Five pillar cards with concise descriptions and proof tags.
5. Four-stat proof grid and an Infabio-team statement adapted from the existing “smarter ads, better ROI, real growth” brand message.
6. Five-step process: Understand, Strategize, Execute, Optimize, Scale.
7. Free-call offer showing the audit, strategy review, opportunities, and takeaway plan.
8. Conversion form with Full Name, Business Name / Website, Monthly Ad Spend, and Phone or Email.
9. Accessible FAQ accordion covering the five main objections.
10. Final CTA band and minimal footer with logo, trust line, and social icons only.

## Form behavior
- Validate required fields, reasonable length limits, contact format, and dropdown selection in the browser.
- On valid submission, show a polished success confirmation and reset the form.
- This version will not save or transmit lead details, matching the selected demo-success option.

## Technical details
- Use the existing TanStack page, semantic design tokens, shared Button/Input/Select/Accordion controls, and Lucide icons.
- Build reusable section, CTA, reveal, counter, telemetry, and form pieces while keeping the single page easy to maintain.
- Use an IntersectionObserver-based reveal/counter implementation rather than adding a heavy animation dependency.
- Add page-specific title, description, Open Graph metadata, and accessible labels/focus states.
- Verify CTA scrolling, form validation/success, accordion behavior, reduced motion, and desktop/mobile layouts in the running preview.
