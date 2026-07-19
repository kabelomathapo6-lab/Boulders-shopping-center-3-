# Company Research & Justification Brief

<!--
  HOW TO USE THIS (delete this comment block when you're done):
  - The [[ YOUR WORDS ]] parts must be written by you — the brief says
    "clearly and in your own words", and that's what's being marked.
  - The technical findings under Q4 are objectively verifiable (I checked
    them), but you should confirm them yourself and add what YOU saw when
    you opened the site on your phone and laptop.
  - Add screenshots of the current site to /outreach-proof or a /screenshots
    folder and reference them — the brief says screenshots are encouraged
    as evidence.
-->

## 1. Which company did you choose?

**Company:** The Boulders Shopping Centre
**Industry:** Retail property / shopping centre (managed by Redefine Properties)
**Current website:** https://boulders.co.za/
**Location:** Old Pretoria Road, Midrand, Gauteng

The Boulders is Midrand's oldest and most established shopping centre — roughly 48 600m²
of retail with over 100 stores, anchored by Pick n Pay, Boxer, Game and the major fashion
chains, plus free parking for 1 900 cars.

## 2. How did you find them?

[[ YOUR WORDS — hint: this one is easy and true. It's your local shopping centre; you
shop there. Say that plainly, and mention that you went looking at their website because
of the project. ]]

## 3. Why did you choose this company specifically?

[[ YOUR WORDS — you have two genuine reasons, and BOTH are worth saying:

   (a) The community/personal one: it's your local centre, the mall you and the people
       around you actually use.

   (b) The commercial one: The Boulders is a hub for dozens of independent SMEs —
       dentists, physios, salons, barbers, optometrists, accountants, small retailers.
       A centre's website is the shopfront for all of them, so improving it lifts every
       tenant inside, not just the landlord.

   Then close with the honest part: when you actually opened the site properly and
   looked at it against basic UX principles, it had real problems (see Q4). That's the
   sentence that turns a strategic pick into a justified one. ]]

## 4. Why does their website need a redesign?

### 4.1 The site is effectively invisible to search engines

This is the most serious issue and it's objectively verifiable:

- Requesting `boulders.co.za` returns almost no HTML — just a page title. All the
  content is rendered client-side by JavaScript after the page loads.
- **Every page carries the same title: "Redefine Retail"** — the landlord's name, not
  the centre's. The homepage, the store list and the mall map are all titled identically.
- As a direct result, **Google's own search result for the site shows "We cannot provide
  a description for this page right now"** — for both `/` and `/home/`.
- There is no meta description and no Open Graph tags, so sharing a link on WhatsApp or
  Facebook produces a preview that says "Redefine Retail" with no image or description.

Why this matters commercially: shoppers search "shops at Boulders Midrand" or "Boulders
trading hours". If the site can't be indexed properly, third-party directories outrank
the centre's own website for its own name.

### 4.2 [[ YOUR WORDS — what YOU saw. Open the site on your laptop AND phone, then write
what's actually wrong. Be specific and concrete. Things to look for:

  - How long does it take before you see anything? (the JS has to load first)
  - The store list: is it just a long page you have to scroll and read? Can you search it?
  - The mall map: it's a zoom in / zoom out / pan widget. How does that feel on a phone?
  - Trading hours: how many clicks to find them? Can you tell if it's open right now?
  - Does anything overlap, break, or need pinch-zooming on mobile?
  - Is there a clear call to action, or does the homepage not really have a job?

  Two or three specific, honest observations here are worth more than a long list of
  adjectives. Add screenshots as evidence. ]]

### 4.3 What a modern centre site does that this one doesn't

Compared to peers like Mall of Africa and Sandton City, the current site is missing the
basics visitors expect: an instantly searchable directory, a clear "open now" status, and
wayfinding that works on the device people actually arrive with — a phone, in the parking lot.

## 5. What I built

[[ YOUR WORDS — a short paragraph. What did you prioritise and why? Suggested spine:
you focused on the three things people actually visit a mall site for — find a shop,
know if it's open, know where it is — instead of redesigning everything. Mention that
you kept the centre's earth-toned brand DNA but lifted it to feel more premium. ]]

The redesign addresses each problem identified above:

| Problem | Fix |
| --- | --- |
| Empty HTML, no description, titled "Redefine Retail" | Real title, meta description and OG tags |
| Store list can't be searched | Instant search + category and level filters |
| Zoom/pan mall map | Level switcher with a readable schematic, no pinching |
| Hours buried | Live "Open now / Closed" status, today highlighted |
| Homepage has no clear job | Search is the hero |

## 6. Note on scope

This is a concept redesign built as a learning project. It uses the centre's real tenant
list, shop numbers and published trading hours so it reflects the actual business rather
than placeholder content, but it is not affiliated with or endorsed by The Boulders
Shopping Centre or Redefine Properties.
