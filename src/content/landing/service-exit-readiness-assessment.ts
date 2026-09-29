import type { ServiceLanding } from "./types";

// The productised, fixed-fee entry point to Mastella's exit readiness work. It scores all 29
// measures in the Review engine; the free Exit Readiness Score (src/content/readiness/model.ts)
// asks 11 of them.
//
// FEES: no price is published by choice; the fee is quoted on a call. If that changes, set
// `offer.priceFrom` (which also adds the price to the structured data) and update public/llms.txt.
export const EXIT_READINESS_ASSESSMENT: ServiceLanding = {
  slug: "exit-readiness-assessment",
  name: "Exit Readiness Assessment",
  title: "Exit Readiness Assessment UK | Fixed-Fee Review | Mastella Advisory",
  metaDescription:
    "Fixed-fee exit readiness assessment for UK owner-managed businesses. 29 buyer measures, verified against your data and senior team. Report in ten working days.",
  h1: "Exit Readiness Assessment",
  heroSubtitle:
    "How a buyer would read your business, scored on 29 measures and verified against your numbers and your team. Fixed fee.",
  intro:
    "The Exit Readiness Assessment scores your business on the 29 measures buyers test in a sale process. Each answer is checked against your accounts, your customer data and interviews with your senior team. The report shows where value is at risk, how a trade buyer or a private equity fund would respond to each weak area, which exit routes are realistic now, and what to fix first.",
  heroCta: { to: "/contact/", label: "Book a call about an Assessment" },
  secondaryCta: { to: "/exit-readiness-score/", label: "Or start with the free score" },
  offer: {
    currency: "GBP",
    display: "Fixed fee, quoted on a short call",
    terms:
      "The fee is set by the size of the business and the number of management interviews, and agreed before any work starts. It is credited in full against Mastella fees if you instruct us on a sale, raise or executive search within 12 months.",
    turnaround: "Report within ten working days of the last interview.",
  },
  steps: [
    {
      title: "Scoping call",
      detail: "Thirty minutes to confirm fit, the fee and the timetable.",
    },
    {
      title: "Questionnaire and data request",
      detail:
        "You answer the 29 questions from your own point of view, which takes about 20 minutes. Your finance lead or accountant completes a short workbook: customers by revenue for three years, three years of financials, and the senior team.",
    },
    {
      title: "Interviews",
      detail:
        "A 90-minute interview with you and 30 minutes with each of three to five senior managers, by video. We present these to your team as a business review. What they are told about any sale is your decision.",
    },
    {
      title: "Report",
      detail:
        "Your score overall and by area, set against your own view; how buyers would read each weak measure; which of a trade sale, private equity, management buyout or employee ownership trust is open to you now; and an action plan in three phases.",
    },
    {
      title: "Debrief",
      detail: "Sixty minutes to go through the findings and agree what to do first.",
    },
    {
      title: "Re-score (optional)",
      detail: "Twelve months later we re-run the Assessment on the same measures, so progress is measured.",
    },
  ],
  faqs: [
    {
      q: "How much does an exit readiness assessment cost?",
      a: "Our Exit Readiness Assessment is a fixed fee, set by the size of the business and the number of management interviews, quoted on a short call and agreed before any work starts. It is credited in full against Mastella fees if you instruct us on a sale, raise or executive search within 12 months. The online Exit Readiness Score on our website is free.",
    },
    {
      q: "How long does an exit readiness assessment take?",
      a: "Usually three to four weeks from the scoping call, most of it waiting for the data workbook and diary time for interviews. The report arrives within ten working days of the last interview. Your own time is about 20 minutes on the questionnaire, a 90-minute interview and a 60-minute debrief.",
    },
    {
      q: "What does an exit readiness assessment measure?",
      a: "Five areas: founder dependency (25% of the score), management depth (20%), earnings quality (25%), growth evidence (15%) and due diligence readiness (15%), made up of 29 individual measures such as the share of revenue held by the founder personally, the largest customer's share of revenue, add-backs as a share of EBITDA and how long month-end close takes. We also record your objectives on timing, proceeds and your role after a deal, and test them against what the business can support.",
    },
    {
      q: "What is the difference between an exit readiness assessment and a business valuation?",
      a: "A valuation estimates what a business is worth. An exit readiness assessment shows how much of that value a buyer is likely to pay in cash at completion and how much they will defer, tie to an earn-out or protect with warranties, and why. Two businesses on the same multiple can see very different terms because of founder dependency, customer concentration or weak reporting.",
    },
    {
      q: "Will my staff find out I am thinking about selling?",
      a: "Not from us. Management interviews are presented as a business review focused on how the company runs. What your team is told about any future sale, and when, is your decision.",
    },
    {
      q: "Can I do an exit readiness assessment myself?",
      a: "You can get a first read with our free online Exit Readiness Score, which asks 11 of the 29 questions, uses the same scoring bands and takes about three minutes. It scores your own answers. The paid Assessment covers all 29 measures and checks each answer against your data and your team, which is where most of the useful findings come from.",
    },
    {
      q: "When is the right time for an exit readiness assessment?",
      a: "Twelve to 36 months before a possible sale gives time to fix what it finds. It is also worth doing straight after an unsolicited approach, before choosing between a trade sale, private equity, a management buyout or an employee ownership trust, or when a key person is about to leave.",
    },
  ],
  contentTodos: [
    {
      heading: "What the Assessment measures",
      cover: [],
      body: [
        "The score is built from 29 measures in five areas. Founder dependency carries 25% of the score: the share of revenue from customers who deal mainly with the founder, the decisions only the founder takes, what happened the last time the founder was away, knowledge that sits only in the founder's head, and personal guarantees or licences in the founder's name. Management depth carries 20%: whether there is a named successor, who runs sales, operations, finance and people, how strong the finance function is, and whether key managers are tied in.",
        "Earnings quality carries 25%: contracted or recurring revenue, the largest customer and the top five as a share of revenue, margin stability over three years, add-backs as a share of EBITDA, and cash conversion. Growth evidence carries 15%: customer revenue retention, revenue growth, pricing, pipeline records and how close the last two budgets came to actual results. Due diligence readiness carries 15%: month-end close, the monthly management pack, revenue under written contract, employment records, IP ownership and open legal and tax items.",
        "The thresholds for the core measures, with what counts as strong, adequate, weak and critical on each, are published on [how we score exit readiness](/resources/exit-readiness-scoring/).",
      ],
    },
    {
      heading: "Verified, not self-assessed",
      cover: [],
      body: [
        "Most readiness tools score a questionnaire. The Assessment starts with one, then tests it. Customer concentration, recurring revenue, margin stability, retention, cash conversion and forecast accuracy are calculated from your data rather than estimated. Founder dependency is tested in interviews with your managers, who are asked the same questions about decisions, customers and absences. Priorities are compared across the team: if your managers name different priorities for the next two years from yours, a buyer will notice that in management meetings.",
        "Every measure in the report is marked as verified, stated by the owner only, or missing. Where your own answer and the evidence differ by two bands or more, the report says so. Those gaps are usually the most useful page for an owner, because they are the points a buyer's due diligence would otherwise find first.",
      ],
    },
    {
      heading: "What you receive",
      cover: [],
      body: [
        "An overall score out of 100 and a score for each area, alongside the score your own answers produce. A line for every weak measure setting out what a trade buyer and a private equity fund typically do about it, for example an earn-out tied to customer retention, a longer founder lock-in, a finance director hire before completion or a specific indemnity.",
        "A view on which routes are open now: trade sale, private equity, management buyout or employee ownership trust, with the reasons. Any conflicts between your objectives and the business, such as wanting to step back within a year when there is no successor in place. And an action plan in three phases (first 90 days, months 3 to 9, months 9 to 18), ranked by how much each action improves the score.",
      ],
    },
    {
      heading: "After the Assessment",
      cover: [],
      body: [
        "Some actions you will do with your own team, accountant and lawyer. Others are work Mastella does: recruiting a successor managing director or a finance director through our [executive search](/executive-search/) team, building a delegated authority schedule, putting a management incentive plan in place, or preparing for a sale when the time is right. The Assessment fee is credited against that work if you instruct us within 12 months.",
        "If you would like a first read before speaking to anyone, the free [Exit Readiness Score](/exit-readiness-score/) asks 11 of the 29 questions and takes about three minutes.",
      ],
    },
  ],
};
