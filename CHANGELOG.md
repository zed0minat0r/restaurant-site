# Changelog

## 2026-03-30

### Mobile-First Audit (Nigel)
- Added AUDIT.md with full mobile-first site audit
- Scores: Design 5 | Content 5 | UX 7 | Technical 7 | Conversion 4 | Simplicity 8 (Total: 36/60, 60%)
- Design/Content capped: no real photography, placeholder contact details (555 phone, fake address)
- Conversion capped: reservation form submits to nowhere, no backend or third-party integration
- Key findings: solid skeleton architecture but missing all production essentials (images, real data, working booking)
- Critical path: real photos, real contact info, functional reservations, Schema.org markup, accessibility fixes

## 2026-03-31

### Initial Setup
- Created repo with VISION.md, STYLE-GUIDE.md, REQUIREMENTS.md, TASKS.md
- Restaurant site: Ember & Oak — Wood-Fired Flavors, Warm Hospitality
- 3 tasks defined, agent team deployed

### Task 1 Complete — Full Site Build
- Created index.html, style.css, main.js
- Hero: moody dark gradient, Playfair Display title, animated entrance, scroll hint, reservation CTA
- Menu: 4 tabbed categories (Starters 4, Mains 5, Desserts 3, Drinks 4) with dotted-line pricing
- Our Story: narrative copy + CSS-only animated flame/log illustration
- Hours & Location: schedule card + map placeholder with CSS pin
- Reservations: full form (date, time, party size, name, phone, special requests) with validation
- Footer/Contact: phone, email, address, social links
- Dark theme default + light mode toggle (localStorage persistence)
- Responsive nav with hamburger slide-out on mobile, inline on desktop
- Scroll fade-up animations, menu tab transitions
- 3 breakpoints: 480px, 768px, 1024px — mobile-first throughout
- Style guide colors: #1a1a1a dark, #D4A853 gold, #F5F0E8 cream, #8B2635 wine
- Typography: Playfair Display headings, Inter body via Google Fonts
