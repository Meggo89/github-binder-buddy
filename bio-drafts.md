# Bio drafts — Leo Meggitt

Status: **review only — not yet wired into pages.** Replace the `{{ ... }}` placeholders with the real facts, tell me which version (or hybrid) you want shipped, and I'll wire into the team card, team page, JSON-LD Person schema, and any other surface.

---

## Current copy on the site (verbatim, for reference)

**Home — `src/pages/Home.tsx` team card** (~20 words)
> 20+ years in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies.

**Team page — `src/pages/Team.tsx` member entry** (~22 words)
> 20+ years experience in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies.

Insight articles list `Leo Meggitt` as author with no bio block — just the byline.

The current copy is generic and CV-flavoured. It tells an owner what Leo *has done*; it doesn't tell them what they *get* if they engage him. The drafts below fix that.

---

## Short bio — 75–100 words

For: team cards (Home + Team), footer credits, LinkedIn re-shares, press queries.

> If you are thinking about selling a business you have built, you should talk to the person who will actually run your process. Leo founded Mastella to do M&A advisory that way — senior-led from first call to completion, off-market wherever possible, with proprietary technology doing the work that used to take weeks of analyst time. {{ TRACK RECORD: 20+ years across UK lower mid-market M&A, fundraising and executive search; insert completed deal count and headline sectors }}.

Word count with placeholder filled: roughly 85–95 words depending on the track-record clause.

---

## Long bio — 300–400 words

For: detail view on the team page (when expanded), About page, pitch decks, LinkedIn About section.

### Para 1 — owner-first hook (~50 words)

> If you have spent fifteen or twenty years building a business you are now thinking about selling, the most important transaction of your career deserves the most senior person in the room — for the duration. Not a polished pitch by the principal followed by a delivery team you have never met.

### Para 2 — founder story (~85 words)

> That is why Leo founded Mastella. After {{ PRIOR ROLES: insert two or three prior firms and titles — e.g. "a decade in lower mid-market M&A at [bank/boutique], then senior roles at [PE firm/advisory]" }}, he kept seeing the same pattern in lower mid-market deals: senior advisors win the mandate, juniors deliver the work, the senior advisor reappears at closing. Owner-managed businesses deserve better. A modern delivery model — proprietary technology handling the structured work, the principal still leading every conversation — finally makes that possible without compromising rigour or coverage.

### Para 3 — track record + credentials (~70 words)

> Across {{ TRACK RECORD: 20+ years; insert completed deal count, aggregate transaction value if disclosable, and sector mix }} of sell-side, fundraising and executive search advisory, Leo has worked with founder-led businesses, family-owned companies and PE-backed firms across {{ SECTORS: insert four to six headline sectors }}. He {{ BOARD ROLES: insert "sits on the boards of" or "has held board roles at" + names — or delete the whole sentence }} and has personally invested in {{ INVESTMENTS: insert one or two if relevant — or delete }}. {{ EDUCATION: insert university and degree }}{{ QUALIFICATIONS: , and insert ACA / CFA / MBA / other if relevant }}.

### Para 4 — how I work (~95 words)

> When you engage Mastella, you engage Leo. He runs the readiness work himself, leads every conversation with potential buyers, manages the negotiation, and signs alongside you on completion day. Behind him, a proprietary technology layer handles the analysis, the buyer mapping, the data-room orchestration and the term-sheet benchmarking — work that traditional advisors still charge for in monthly retainers but no longer needs to be done by hand. That combination is what gets a deal done at the right price, on the right terms, in less time than the traditional process.

### Optional close — personal warmth (one line)

> {{ PERSONAL: optional — e.g. "Based in London. Outside the firm: [hobby/interest]. Lives in [area] with his family." Skip this paragraph if the bio is for a press queries deck. }}

**Total length:** 320–360 words once placeholders are filled. Sits exactly in the 300–400 target.

---

## Placeholders you need to fill

Copy this list, fill the right-hand side, paste back to me and I'll inject them into both bios in one pass.

| Placeholder | What to provide | Used in |
|---|---|---|
| `{{ TRACK RECORD }}` | Deal count, aggregate transaction value (if disclosable), headline sector mix | Short + Long Para 3 |
| `{{ PRIOR ROLES }}` | Two or three prior firm names + roles, in order. Example format: *"a decade in lower mid-market M&A at Lazard, then a senior advisory role at a London PE firm"* | Long Para 2 |
| `{{ SECTORS }}` | 4–6 sectors you've actually advised in. Drop the ones that aren't true. | Long Para 3 |
| `{{ BOARD ROLES }}` | Current and past non-exec / board / advisory roles. Or "delete this sentence" if you'd rather not list. | Long Para 3 |
| `{{ INVESTMENTS }}` | Companies you've personally invested in if happy to disclose. Otherwise "delete this sentence". | Long Para 3 |
| `{{ EDUCATION }}` | University + degree (e.g. "Oxford, BA Economics") | Long Para 3 |
| `{{ QUALIFICATIONS }}` | ACA / CFA / MBA / other professional designations. Optional. | Long Para 3 |
| `{{ PERSONAL }}` | Optional one-liner of warmth (location, family, outside interest). Optional — fine to skip. | Long close |

---

## When you've filled the placeholders

Tell me:
1. **Which version is the canonical** — the long one for /team detail and About, the short one for cards. (Default assumption.)
2. Whether you want the personal-warmth close on or off.
3. Any specific facts you want emphasised that the placeholders don't capture.

I'll then:
- Replace the descriptions on Home team card and Team page with the short bio
- Add an "About Leo" expanded section on the Team page using the long bio
- Update the JSON-LD Person schema (`jobTitle`, `description`, `alumniOf`, `knowsAbout`, `sameAs` — the LinkedIn URL is already there)
- Use the short bio as the Article author byline / publisher description for insights articles
