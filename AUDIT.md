# Ember & Oak — Mobile-First Audit (Round 3)

**Auditor:** Nigel — Senior Digital Auditor
**Date:** 2026-03-30
**Perspective:** Mobile-primary (375px baseline, tested mentally across breakpoints)
**Context:** Template site for a web design business. Placeholder images, mock contact details, and simulated booking forms are expected and not penalised.

---

## Scores

```json
{
  "design": 8,
  "content": 7,
  "ux": 8,
  "technical": 8,
  "conversion": 8,
  "simplicity": 8,
  "total": 47,
  "max_possible": 60,
  "percentage": "78%",
  "score_history": [
    {
      "date": "2026-03-30",
      "round": 1,
      "scores": { "design": 5, "content": 5, "ux": 7, "technical": 7, "conversion": 4, "simplicity": 8 },
      "total": 36,
      "percentage": "60%"
    },
    {
      "date": "2026-03-30",
      "round": 2,
      "scores": { "design": 7, "content": 7, "ux": 8, "technical": 7, "conversion": 7, "simplicity": 8 },
      "total": 44,
      "percentage": "73%"
    },
    {
      "date": "2026-03-30",
      "round": 3,
      "scores": { "design": 8, "content": 7, "ux": 8, "technical": 8, "conversion": 8, "simplicity": 8 },
      "total": 47,
      "percentage": "78%"
    }
  ]
}
```

---

## Design — 8/10 (+1)

The additions since Round 2 push this into properly impressive territory for a template.

**What improved:**
- SVG social icons in the footer replacing the "IG/FB/TK" text labels. Night and day difference. The feather-style stroke icons are consistent with the site's aesthetic — not borrowed from a random icon pack, but deliberately minimal. This one change makes the footer look finished rather than draft.
- SVG flame favicon is a smart touch. The browser tab now has identity. Two nested paths, gold gradients, and it reads clearly at 16x16. Five minutes of work that signals the template builder sweats the details.
- The testimonials section card design is clean and restrained: border-only cards, gold star ratings, Playfair italic for quotes, Inter for attribution. No bloated avatar circles or decorative flourishes. It trusts the content.
- Mobile sticky bottom bar is well-executed visually — glassmorphic dark background with `backdrop-filter: blur(12px)`, gold accent border-top, safe-area-inset support for notched iPhones. The Call Us (outlined) vs Reserve (filled gold) button hierarchy is immediately legible. This is the kind of component that sells a template.
- Footer centering on mobile (max-width: 479px) is now correct — text-align center, socials justified center. Previously the left-aligned footer looked orphaned on small screens.

**What still needs work:**
- Map placeholder remains the weakest visual element. The CSS grid pattern + pin reads as "I didn't bother" rather than "placeholder for your content." Consider a labelled illustration: "Your Google Map embed here" with a subtle map outline. Or at minimum, a brief explainer note.
- No hero background variation for light mode. The dark hero uses rich layered radial gradients that create genuine atmosphere. The light hero is essentially flat cream with a barely-visible warm gradient. A subtle linen texture or paper grain would differentiate it.
- Testimonials cards are all identical 5-star reviews. Mixing in a 4.5-star (4 filled + 1 half) would read as more authentic and demonstrate the template's flexibility to prospective clients.

---

## Content — 7/10 (unchanged)

No new content sections were added. The testimonials addition was called for in Round 2 and it landed well, but it was already factored into the previous score as a noted gap. The testimonials copy itself is good — specific, believable, referencing actual menu items (oak-grilled ribeye, smoked chocolate torte, Ember Old Fashioned). This is template copy done properly: a client reads it and immediately imagines their own reviews in those slots.

**Still missing (as noted in Round 2):**
- Photo gallery placeholder section. For a restaurant template, a "Gallery" or "Atmosphere" section with placeholder image slots is table stakes. Clients want to see where their photos go.
- Private events / group dining section. The reservation form mentions "parties over 8, call us directly" — so where does a prospective event booker learn more? Missing conversion path for a high-value customer segment.
- Chef's specials or seasonal feature area. The menu is static tabs. A highlighted "This Week's Feature" slot would demonstrate dynamic content capability.
- No allergen/dietary icons on menu items (V, VG, GF). Easy to add and signals modern restaurant awareness.

These gaps keep the content score locked at 7. The quality of existing copy is high; the quantity and depth of sections is not competitive with premium restaurant templates.

---

## UX — 8/10 (unchanged)

The mobile sticky bar is a genuine UX improvement. Let me be specific about why.

**What the sticky bar gets right:**
- Appears after 60% hero scroll — not immediately (annoying) or too late (useless). The trigger point is tuned.
- Two actions only: Call and Reserve. No cognitive overload. The most common mobile intents for a restaurant visitor are "book" and "call." This bar nails both.
- 48px min-height touch targets on both buttons. Properly thumb-friendly.
- `env(safe-area-inset-bottom)` padding — respects the iPhone home indicator. A detail most templates miss.
- Slides up with cubic-bezier easing, not a hard cut. Smooth but not slow (350ms).
- Hidden on desktop (1024px+) where it would be redundant. Correct breakpoint choice.
- Footer padding adjusted so the bar doesn't obscure content. This is the kind of implementation detail that shows someone actually tested the thing.

**Persisting UX gaps (all from Round 2):**
- No back-to-top button on what is now an even longer page (testimonials section added).
- Form validation still accepts any string in `type="tel"`. Pattern validation needed.
- No loading/submitting state on reservation button during mock submission.
- Menu tab animations re-trigger opacity-0-to-1 on every switch. The flash is still jittery.
- `prefers-reduced-motion` now exists (good) but the implementation is aggressive — 0.01ms durations rather than disabling animation entirely. Some users prefer reduced motion, not zero motion. The spec suggests reducing, not eliminating. Minor point.

---

## Technical — 8/10 (+1)

The SEO and accessibility additions are meaningful technical improvements.

**What improved:**
- Open Graph and Twitter Card meta tags with placeholder values. Social sharing previews will now show title, description, and image URL (pointing to `your-domain.com` as expected for a template). This is production-ready metadata.
- Schema.org Restaurant JSON-LD structured data: name, address, telephone, hours, cuisine type, price range. Google can parse this immediately when a client deploys. The opening hours specification is correctly formatted with individual day-of-week arrays. Properly done.
- SVG favicon via `data:image/svg+xml` inline — zero HTTP requests, works everywhere, scales infinitely. The implementation choice is correct for a template.
- `prefers-reduced-motion` media query — universal selector with `!important` on animation/transition duration, plus specific resets for hero elements and scroll animations. Comprehensive.
- `prefers-color-scheme` media query for OS-level dark/light preference detection. The JS also checks `matchMedia('(prefers-color-scheme: light)')` for initial state when no localStorage preference exists. Correct cascade: saved preference > OS preference > dark default.

**Persisting technical gaps:**
- Google Fonts still loaded render-blocking. Two external CSS requests before first paint. `<link rel="preload">` with `onload` swap, or `font-display: optional` strategy, would improve LCP. For a template demoing performance consciousness, this matters.
- `overflow-x: hidden` on body still present (line 70). Still masking rather than preventing horizontal overflow.
- No error handling in the main IIFE. Every `document.getElementById` and `querySelector` call assumes success. One null reference breaks everything downstream.
- Desktop nav links font-size is 0.85rem (13.6px) — below the 14px minimum the previous QA pass established. The mobile nav was fixed but desktop was missed.
- `.testimonials__source` font-size is 0.8rem (12.8px) — below 14px minimum. New code introduced with the same accessibility issue that was previously fixed elsewhere.
- `overflow-x: hidden` on the `.menu` section (line 489) — reasonable for the swipe animation but should be documented.

---

## Conversion — 8/10 (+1)

The mobile sticky bar is a conversion feature, and it earns the point.

**What improved:**
- Persistent "Reserve" CTA on mobile via sticky bottom bar. A user browsing the menu or reading the story section no longer has to scroll all the way down to book. The reservation form is one tap away at all times. This is the conversion pattern every serious restaurant site uses, and its presence in the template demonstrates conversion awareness.
- "Call Us" button with `href="tel:"` — one-tap calling on mobile. For restaurants, phone bookings are still a significant percentage of reservations. Including this alongside the digital CTA shows understanding of real-world restaurant conversion paths.
- Testimonials section provides social proof before the reservation form. The section ordering (Menu > Story > Hours > Reviews > Reservations) now includes a trust-building step that the previous version lacked. Three specific, believable reviews from different sources (Google, Yelp, OpenTable) is the right pattern.

**Persisting conversion gaps:**
- "Get Directions" is still a dead `href="#"` link. Even for a template, this should demonstrate intent — `href="https://maps.google.com/?q=742+Hearthstone+Lane+Philadelphia+PA"` would cost nothing and show the template handles real-world linking.
- No secondary CTAs between sections. The hero CTA and sticky bar handle the primary "reserve" path, but there's no "View Full Menu" teaser after the story section, no "Book for a Special Occasion" after testimonials. Micro-CTAs between sections guide the conversion funnel.
- Post-submission success state is still minimal. "We'll confirm shortly via phone" — no confirmation number placeholder, no "Add to Calendar" button, no email confirmation mention. For a template demo, a richer success state shows the client what their booking experience could feel like.
- No email capture or newsletter signup anywhere. A "Stay in the loop" input in the footer would demonstrate another conversion path for the template.

---

## Simplicity — 8/10 (unchanged)

Still the strongest dimension. The additions (testimonials, sticky bar, meta tags) were all additive without introducing complexity. No new dependencies, no new files, no build steps. The site remains three files: HTML, CSS, JS. Self-contained, drag-and-deploy.

**Slight concern:** CSS has grown to ~1613 lines. The `.mobile-bar` styles are defined, then a second `.mobile-bar { justify-content: center; }` declaration appears 7 lines later (line 1488) outside its logical block. The footer centering also has two separate media query blocks for similar tablet/mobile ranges. Some consolidation would prevent this from becoming unwieldy. Not docking points yet, but the trajectory needs attention.

---

## Summary

**Round 2 to Round 3 delta: +3 points (44 -> 47, 73% -> 78%)**

The improvements since Round 2 are real but incremental. The additions — testimonials, sticky mobile bar, SVG icons, favicon, SEO meta, accessibility queries — are exactly what was prescribed in the previous audit. They were all executed cleanly and without over-engineering. Credit where due: the team listened and shipped.

The site now crosses the threshold from "solid template skeleton" to "genuinely impressive demo." The mobile experience is thoughtful. The code is clean. The conversion flow makes sense. The design has taste.

### What would push this to 52+/60

1. **Photo gallery / atmosphere section** — A grid of placeholder image slots with a lightbox pattern. This is the single biggest missing section for a restaurant template. Clients sell with visuals.
2. **Private events section** — Brief copy block + inquiry form or CTA. High-value conversion path that most restaurant templates include.
3. **Rich post-booking success state** — Confirmation number, calendar link, email mention. Show the client the full booking UX, not just the form.
4. **Fix remaining font-size violations** — Desktop nav (0.85rem) and testimonial source (0.8rem) are below 14px. The QA pass fixed mobile but missed these.
5. **Render-blocking fonts** — `<link rel="preload">` or `font-display: optional` strategy. Easy technical win.
6. **Micro-CTAs between sections** — "View the menu" after story, "Book your table" after testimonials. Guide the scroll.

### Would this impress a potential client?

**Yes.** With less hedging than Round 2. A restaurant owner looking at this template on their phone would see a polished, fast, well-structured site that feels like their restaurant could live here. The sticky Call/Reserve bar, the live open/closed badge, the swipeable menu tabs, the testimonials — these are features that go beyond "nice template" into "this person understands how restaurants work online." The remaining gaps (gallery, events, richer booking flow) are the difference between "I'm interested" and "shut up and take my money."
