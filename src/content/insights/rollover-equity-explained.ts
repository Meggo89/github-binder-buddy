import type { Article } from './types';

const article: Article = {
  slug: 'rollover-equity-explained',
  title: 'Rollover Equity Explained: What UK Founders Actually Get, and What to Watch For',
  excerpt:
    'Rollover equity is a common feature of UK lower mid-market deals and one of the most misunderstood. What it is, why buyers offer it, how it is structured, current UK tax treatment, and where the traps sit.',
  content: `
      <p><em>Advised by Leo Meggitt, Managing Director, Mastella Advisory. Last updated August 2026.</em></p>

      <p>You have negotiated the headline price. The buyer's term sheet now proposes that a portion of your consideration comes not as cash but as "rollover equity" in the acquisition vehicle. Maybe 20% of your consideration. Maybe 40%. The framing is positive: alignment, upside, second bite of the cherry. The mechanics are more complicated than the framing suggests.</p>

      <p>Rollover equity is one of the most common and most misunderstood features of UK lower mid-market M&amp;A. It is not free money and it is not straightforward equity. This guide explains what rollover actually is, why buyers offer it, how it is typically structured for UK deals, current UK tax treatment (as of 2026), what a genuinely good rollover looks like, and where the traps sit.</p>

      <h2>What is rollover equity?</h2>

      <p>Rollover equity is the portion of your sale consideration that you agree to receive in the form of shares in the acquisition vehicle (the "NewCo" or "TopCo" that the buyer sets up to hold the acquired business), instead of cash on completion. Legally, you sell all your shares in the target company to NewCo for a mix of cash and NewCo shares. You end up as a minority shareholder in NewCo alongside the buyer.</p>

      <p>The label "rollover" reflects that a portion of your ownership rolls over from the old company into the new structure, rather than being fully liquidated. In UK deals this is typically done as a share-for-share exchange, which (subject to specific rules) can defer the tax charge on the rollover portion. We cover the tax treatment in detail below.</p>

      <p>Rollover is common across PE deals, universal in search fund deals, occasional in strategic-acquirer deals (usually only in take-private scenarios), and rare in outright trade sales to a corporate acquirer.</p>

      <h2>Why do buyers offer rollover?</h2>

      <p>Three reasons, in rough order of importance:</p>

      <ol>
        <li><strong>Alignment.</strong> A seller who has meaningful equity in the new structure has a genuine financial interest in the business continuing to succeed post-completion. This matters most in situations where the seller retains a meaningful ongoing role (chair, advisor, sometimes CEO for a period).</li>
        <li><strong>Capital efficiency.</strong> Buyers who ask sellers to roll are asking sellers to "invest" a portion of consideration back into the business. This reduces the total cash the buyer needs to raise at completion, which in turn improves the buyer's returns.</li>
        <li><strong>Signalling and risk-sharing.</strong> A seller willing to roll is signalling confidence in the future of the business. This is particularly valuable to buyers where the going-concern risk is meaningful, e.g., where a founder is retiring and management succession has not been fully proven.</li>
      </ol>

      <p>For sellers, the trade-off is straightforward in principle: you accept some risk (your money continues to be at work in the business you no longer control) in exchange for potential upside (a second exit event that may produce further liquidity at a higher valuation, and often a step-up in the value of the rollover portion). Whether that trade is worth it depends on the specific terms.</p>

      <h2>How is rollover typically structured in UK deals?</h2>

      <p>UK rollover structures vary but sit around a common pattern:</p>

      <ul>
        <li><strong>Percentage of consideration rolled.</strong> Search funds typically ask for 10 to 30% of consideration to roll. PE typically asks for 20 to 40%. Strategic acquirers, on the rare occasions they offer rollover, ask for 10 to 25% into the acquirer's shares (a very different animal from unlisted NewCo equity).</li>
        <li><strong>Type of shares received.</strong> Typically preferred equity in NewCo (senior in the capital stack, with a coupon or a preferred return on eventual exit) rather than pure common equity. Sometimes a mix: part preferred, part common. Occasionally institutional strip equity that mirrors the buyer's own investment terms one-for-one.</li>
        <li><strong>Preferred return / coupon.</strong> If the rollover is preferred equity, it typically carries a coupon of 8 to 12% per annum, either paid in cash quarterly or accrued and paid on exit. The coupon compensates the seller for the illiquidity and for the ranking risk (preferred sits behind senior debt in a downside scenario).</li>
        <li><strong>Liquidity mechanism.</strong> Rollover shares typically become liquid at the buyer's next liquidity event (sale to a subsequent buyer, IPO, or refinancing). Some deals include a put/call mechanism giving the seller a defined exit right after 3 to 5 years at a formula-based valuation.</li>
        <li><strong>Anti-dilution and information rights.</strong> Standard NewCo shareholder agreements include anti-dilution provisions, information rights on the business's performance, and board observer or director rights depending on the size of the rollover.</li>
        <li><strong>Vesting and leaver provisions.</strong> Where the seller stays on in an executive role, the rollover may be subject to good leaver / bad leaver provisions. Understand these carefully; they can materially change the value of the rollover if the seller leaves for a defined "bad" reason.</li>
      </ul>

      <h2>UK tax treatment of rollover equity in 2026</h2>

      <p>The tax treatment of rollover equity is one of the reasons the mechanism exists, but the treatment has become materially less attractive over the last three years and continues to change. What follows is a summary of the position as of August 2026, but tax advice on any specific rollover should always come from your transaction-tax specialist. This is not tax advice.</p>

      <h3>Share-for-share exchange relief (TCGA 1992 s135)</h3>

      <p>The core mechanism that makes rollover work is a share-for-share exchange under section 135 of the Taxation of Chargeable Gains Act 1992. Where the exchange qualifies (bona fide commercial purpose, HMRC clearance often obtained), the CGT charge on the rollover portion is deferred until the seller eventually disposes of the NewCo shares. The seller only pays CGT on the cash portion of the consideration at completion; the rollover portion is treated as a continuation of the original holding.</p>

      <h3>Business Asset Disposal Relief (BADR) rate in 2026</h3>

      <p>BADR (formerly Entrepreneurs' Relief) has been progressively tightened. The lifetime limit is £1M of gains. The CGT rate on qualifying disposals within BADR rose from the historical 10% to 14% from 6 April 2025, and rose again to 18% from 6 April 2026, matching the general lower rate of CGT. On rollover deals, the cash portion of consideration typically attracts BADR at the current 18% rate (subject to the £1M lifetime cap); the rollover portion defers the charge until eventual disposal, at which point the then-current CGT rates apply.</p>

      <p>The practical implication: rollover equity that eventually exits at a higher valuation may be taxed at a higher effective rate than the cash portion, depending on what CGT rates look like at that point. This has changed the seller economics of rollover meaningfully over the last three years, and the calculation should be run under current rates rather than the historic ones sellers may remember.</p>

      <h3>Employment-related securities (ERS)</h3>

      <p>Where the seller continues in an executive role post-sale, HMRC may treat the rollover shares as employment-related securities. This can bring the shares within income tax charges under Chapter 3B of ITEPA 2003 rather than CGT, which is dramatically less favourable. Careful structuring, HMRC clearance, and specialist tax advice pre-signing are essential where the seller is remaining on as an employee or director post-completion.</p>

      <h3>Non-UK sellers and cross-border considerations</h3>

      <p>Rollover into a UK NewCo by a non-UK-resident seller raises additional complexity (UK tax residence of shares, treaty relief, deemed disposal on future emigration). Sellers with any cross-border element should engage transaction-tax specialists early.</p>

      <h2>Talk to us</h2>

      <p>If you are being asked to accept meaningful rollover in a specific deal and want an independent view on whether the terms are fair, <a href="/contact/">book a 45-minute confidential conversation</a>. We work with UK owners on rollover structure, tax positioning and negotiation, alongside the wider deal.</p>

      <h2>What does a "good" rollover look like?</h2>

      <p>A rollover offer worth accepting typically has most of the following features:</p>

      <ul>
        <li><strong>Preferred equity with a real coupon (8 to 12% per annum).</strong> The coupon compensates for illiquidity and ranking risk. A rollover offered as pure common equity with no coupon is meaningfully less attractive than the same nominal percentage in preferred.</li>
        <li><strong>Ranking above management options and any incoming CEO equity.</strong> The rollover should sit senior to any equity issued to the new management team or (in a search fund case) to the incoming CEO's common carry.</li>
        <li><strong>Genuine information rights.</strong> Monthly management accounts, quarterly board packs, and annual audit. Rollover holders should not be flying blind on their own investment.</li>
        <li><strong>Board observer or director seat (for meaningful rollover positions).</strong> For rollover portions above ~20% of the equity in NewCo, board representation is standard.</li>
        <li><strong>Clear liquidity mechanism.</strong> Either a defined put/call at a formula valuation after 3 to 5 years, or clear drag-along / tag-along rights ensuring the rollover holder participates in any exit the majority pursues.</li>
        <li><strong>Standard minority protections.</strong> Anti-dilution, veto rights over specific reserved matters (transactions with related parties, changes to share rights, further debt raises beyond a threshold).</li>
        <li><strong>Fair leaver provisions (if the seller stays on).</strong> Good leaver definition should include retirement, ill-health, and death; bad leaver definition should be narrow and specific rather than open-ended.</li>
      </ul>

      <h2>Where the traps sit</h2>

      <p>Rollover offers frequently arrive with terms that look reasonable in the term sheet but produce disappointing outcomes on realisation. The most common traps:</p>

      <ol>
        <li><strong>Common equity dressed as rollover.</strong> Some buyers structure rollover as pure common equity (with no preferred return, ranking behind everything else in the capital stack). In a downside scenario this rollover is worth zero long before the business is worth zero. Push for preferred equity, or accept a materially lower rollover percentage.</li>
        <li><strong>Broad "bad leaver" definitions.</strong> Where the seller stays on, some SPAs contain leaver provisions that treat almost any departure as "bad leaver" and trigger forfeiture or par-value repurchase of the rollover. This can wipe out the rollover entirely on scenarios the seller reasonably considered "not their fault". Negotiate the definition narrowly.</li>
        <li><strong>No exit mechanism.</strong> Some rollover structures make the shares illiquid indefinitely, with no put/call and no clear path to a second exit. If the buyer chooses to hold long term, the seller is locked in without recourse. Insist on a defined liquidity mechanism.</li>
        <li><strong>Dilution through subsequent capital raises.</strong> Without anti-dilution or pre-emption rights, subsequent PE-led capital raises can materially dilute the seller's rollover position. Anti-dilution provisions are standard and should not be waived.</li>
        <li><strong>ERS (employment-related securities) trap.</strong> Where the seller remains as an employee, HMRC may treat the rollover as ERS and apply income tax rather than CGT. This has caught out multiple UK sellers in the last three years. Get clearance in advance.</li>
        <li><strong>Rollover into a highly-leveraged capital structure.</strong> Where the buyer is loading NewCo with material senior debt, the equity value (including the rollover) is much more sensitive to earnings deterioration. Understand the debt sizing and covenants before rolling.</li>
        <li><strong>Vesting on rollover shares that were "already vested" in economic terms.</strong> Occasionally buyers propose that rollover shares vest over 3 to 5 years despite the seller having earned them through the sale of their pre-existing business. This is usually pushback-able.</li>
      </ol>

      <h2>Negotiating rollover well</h2>

      <p>A useful frame for the rollover negotiation is that you are effectively investing a portion of your proceeds into the buyer's investment vehicle at the deal's implied valuation. Ask the questions you would ask if you were being pitched the investment fresh:</p>

      <ul>
        <li>What is the value-creation plan and the underlying assumptions?</li>
        <li>What is the exit path and target timing?</li>
        <li>What is the debt sizing and covenant headroom?</li>
        <li>What is the ranking of my rollover in the capital stack?</li>
        <li>What protections do I have as a minority?</li>
        <li>What liquidity is available if I need to exit the rollover before the buyer chooses to sell?</li>
      </ul>

      <p>Buyers are usually receptive to these questions from sellers taking material rollover. Buyers who resist answering directly are telling you something about the quality of the terms on offer.</p>

      <h2>How rollover interacts with the wider deal</h2>

      <p>The rollover portion is negotiated as part of the overall deal package, not in isolation. Trade-offs exist between headline price, cash proportion, rollover percentage, earn-out structure and non-price terms. A structured M&amp;A process across the full buyer pool typically produces materially better rollover terms than bilateral negotiation, because the buyer knows their rollover terms are being compared to what other buyers would offer for the same asset.</p>

      <p>For owners early in the exit planning process, our <a href="/services/exit-planning-advisor-uk/">exit planning guide</a> covers the wider preparation work that shapes what rollover offers you are likely to receive. For owners in an active process, <a href="/contact/">contact us</a> for an independent view on any specific rollover proposal.</p>

      <h2>Conclusion</h2>

      <p>Rollover equity can be a genuinely good outcome for sellers where the business has clear onward growth, the buyer has a credible plan, and the terms are structured properly. It can also be a mechanism by which sellers give back significant portions of their agreed consideration without realising it, either through unfavourable capital structure, weak minority protections, or tax treatment that has shifted materially over the last three years.</p>

      <p>Understand the terms line by line. Get proper tax advice on the current UK position (which is not the same as it was three years ago). Negotiate hard on the mechanics: ranking, coupon, information rights, liquidity, leaver provisions. And if in doubt, <a href="/contact/">talk to us</a>. Forty-five minutes, no obligation, and you will leave with a clearer view of whether the rollover on your table is worth what the term sheet is asking you to pay for it.</p>
    `,
  author: 'Leo Meggitt',
  date: '18 August 2026',
  dateModified: '18 August 2026',
  readTime: '10 min read',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070',
  category: 'Deal Structure',
  faqs: [
    {
      q: 'What is rollover equity in a UK business sale?',
      a: 'Rollover equity is the portion of your sale consideration you agree to receive as shares in the buyer\'s acquisition vehicle (NewCo/TopCo) rather than cash. Structurally, you sell all your target-company shares to NewCo for a mix of cash plus NewCo shares. You end up as a minority shareholder in NewCo alongside the buyer, participating in the eventual second exit.',
    },
    {
      q: 'What percentage of consideration is typically rolled over?',
      a: 'Search funds typically ask for 10 to 30% of consideration to roll. Private equity typically asks for 20 to 40%. Strategic acquirers rarely offer rollover; when they do (usually in take-private scenarios), 10 to 25% is typical, into the acquirer\'s listed shares which is a very different instrument from unlisted NewCo equity.',
    },
    {
      q: 'Is rollover equity taxable at completion?',
      a: 'Under a qualifying share-for-share exchange (TCGA 1992 s135), CGT on the rollover portion is deferred until you eventually dispose of the NewCo shares. You pay CGT only on the cash portion at completion. The rollover is treated as a continuation of the original holding. HMRC clearance is often obtained in advance. Employment-related securities (ERS) rules can override this treatment where the seller stays on as an employee, so specialist tax advice is essential.',
    },
    {
      q: 'What is the current UK CGT rate on the cash portion of a sale in 2026?',
      a: 'Business Asset Disposal Relief (BADR, formerly Entrepreneurs\' Relief) applies to qualifying disposals up to a £1M lifetime limit. The BADR rate rose from 10% to 14% from 6 April 2025 and rose again to 18% from 6 April 2026. Cash consideration in excess of the £1M lifetime BADR limit is typically taxed at the higher CGT rate. Individual tax positions vary; specialist advice is essential.',
    },
    {
      q: 'What is preferred vs common rollover equity?',
      a: 'Preferred equity ranks senior to common in the capital stack (paid out first in any exit or distribution) and typically carries a coupon of 8 to 12% per annum (paid in cash or accrued). Common equity ranks last, has no coupon, and shares only in residual value after preferred and debt are paid. A rollover offered as pure common equity is meaningfully less attractive than the same nominal percentage in preferred.',
    },
    {
      q: 'What is a good leaver / bad leaver provision on rollover equity?',
      a: 'Where a seller stays on as an executive post-sale, the rollover shares may be subject to leaver provisions. "Good leaver" (typically retirement, ill-health, death, unfair dismissal) preserves the rollover at fair value. "Bad leaver" (typically resignation without cause, dismissal for cause) can trigger forfeiture or par-value repurchase. The definitions matter enormously; broad bad-leaver definitions can wipe out the rollover in scenarios the seller reasonably considered "not their fault".',
    },
    {
      q: 'How do I get liquidity from my rollover equity?',
      a: 'Typically at the buyer\'s next liquidity event: sale to a subsequent buyer, IPO, or major refinancing. Some rollover structures include a put/call mechanism giving the seller a defined exit right after 3 to 5 years at a formula-based valuation. Without such a mechanism, the rollover is illiquid until the buyer chooses to sell, which can be years longer than the seller expected. Insist on a defined liquidity mechanism.',
    },
    {
      q: 'Should I accept rollover equity in my deal?',
      a: 'Depends on the specific terms, the buyer\'s credibility, the capital structure they are building, and your own risk tolerance and liquidity needs. Rollover can be genuinely attractive where the buyer has a credible growth plan and the terms are properly structured (preferred equity, real coupon, clear liquidity, fair leaver terms). Rollover can also be a mechanism by which sellers give back meaningful consideration without realising it if the terms are unfavourable. Independent advice on any specific rollover proposal is worthwhile.',
    },
  ],
};

export default article;
