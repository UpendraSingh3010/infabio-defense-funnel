# Infabio Defense Funnel

Build a single-page, single-CTA marketing funnel landing page for Infabio 

(a women-powered digital marketing agency, infabio.com), reusing their 

existing visual system:

VISUAL SYSTEM

- Background: near-black navy (#050713), high-contrast white text

- Accent motif: small uppercase "telemetry" tags (e.g. "Budget Defence: Active") 

  used as ambient badges near stats/headlines

- Animated counters for key stats

- Rounded, dark cards with subtle borders for pillar/feature blocks

- Framer-motion-style scroll reveals (fade/slide up on scroll)

- Tone: confident, data-driven, anti-hype ("we don't promise viral")

PAGE GOAL

Single objective: get the visitor to submit the lead form / book a free 

strategy call. No navigation menu, no links to other site pages, no footer 

sitemap. Repeat the exact same CTA button copy/color in every section.

SECTIONS (in order)

1. Minimal sticky header: logo (left) + one CTA button (right). No nav links.

2. Hero: headline "World's First Women-Powered Marketing Defense Agency" 

   (or a message-matched variant if this funnel targets one specific ad), 

   subhead on saving budget vs burning it, one CTA button, live stat strip 

   (50+ Brands Scaled / 40% Ad Waste Reduced / 12x Average ROAS).

3. Problem section: two-column "Drift vs Armor" comparison — left column 

   (✕ red/muted) lists what most agencies do wrong (chase impressions, spend 

   without strategy, report vanity metrics); right column (✓ accent) lists 

   Infabio's approach (lower spend, improve acquisition, raise conversion, 

   sustainable growth).

4. Solution/pillars: 5 cards — Reduce Ad Waste, Improve Conversions, Strong 

   Brand Positioning, Deliver Measurable ROI, Scale Sustainably. One line 

   each, small stat tag on each card (e.g. "40% saved").

5. Proof section: 4-stat grid (₹240Cr+ Budget Defended / 94% Success Rate / 

   500+ Brands Protected / 3 Continents) + one founder-team testimonial quote.

6. Process: 5-step numbered stepper — Understand, Strategize, Execute, 

   Optimize, Scale — one sentence each.

7. The Offer: 3-4 bullets describing exactly what happens on the free call 

   and what the visitor walks away with (e.g. "a free ad-waste audit of your 

   current spend").

8. Lead form (this is the conversion point): fields = Full Name, Business 

   Name / Website, Monthly Ad Spend (dropdown), Phone or Email. Single 

   submit button: "Book My Free Strategy Call". Style form inputs to match 

   the dark theme (dark fields, light text, accent-colored focus state).

9. FAQ accordion: 4-5 objections — "Is this really free?", "What if I 

   already work with an agency?", "How soon will I see results?", "Do you 

   work with businesses in my industry?"

10. Final CTA band: repeat headline + same CTA button. Footer: logo, one 

    trust line, social icons only — no sitemap links.

TECHNICAL

- Fully responsive, mobile-first (funnel traffic is majority mobile/ad-driven)

- Reuse Infabio's existing fonts/spacing/color tokens rather than inventing 

  a new system

- Fast load — this page will run behind paid ads, so keep animations light 

  and avoid heavy unoptimized assets

- Every CTA click should scroll to (or open) the lead form, not navigate away

this the prompt https://www.infabio.com/ and website link that i am making funnel you can also read the website check it's ui, font , backgroud beacause i want the same background for my funnel

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d3fa3749-686f-4cde-8d9d-5fac8ad40ebe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
