// GENERATED FILE. Do not edit by hand.
// Source: Mastella Transferability Review config (config/indicators.yaml v1.0, actions.yaml),
// exported with `python -m boycie.web_export`. Change the config, re-export, commit.
// Contains only the public part of the model. Structure outlook, fee lines and route rules stay private.

import type { ReadinessModel } from './types';

export const MODEL: ReadinessModel = {
  "version": "1.0",
  "scale": {
    "4": "Strong",
    "3": "Adequate",
    "2": "Weak",
    "1": "Critical"
  },
  "totalMeasures": 29,
  "modules": [
    {
      "id": "FD",
      "name": "Founder dependency",
      "weight": 25,
      "purpose": "How much of the business walks out of the door if the founder does. The main driver of earn-out size, lock-in length and how much consideration is paid in cash at completion.",
      "totalMeasures": 6
    },
    {
      "id": "MD",
      "name": "Management depth",
      "weight": 20,
      "purpose": "Whether a team exists that a buyer can back. Sets how much of the founder's role a buyer has to replace, and whether an MBO or EOT route is realistic.",
      "totalMeasures": 6
    },
    {
      "id": "EQ",
      "name": "Earnings quality",
      "weight": 25,
      "purpose": "How much of reported profit a buyer will actually underwrite. Drives the EBITDA the multiple is applied to, and whether price is paid on the latest year or an average.",
      "totalMeasures": 6
    },
    {
      "id": "GE",
      "name": "Growth evidence",
      "weight": 15,
      "purpose": "Whether the growth story is supported by evidence. Buyers pay for growth they can see in the data, and discount growth that only appears in the plan.",
      "totalMeasures": 5
    },
    {
      "id": "DD",
      "name": "Due diligence readiness",
      "weight": 15,
      "purpose": "How quickly and cleanly the business can get through a buyer's due diligence. Weak readiness costs time, fees and price chips late in the process when the founder has least leverage.",
      "totalMeasures": 6
    }
  ],
  "indicators": [
    {
      "id": "FD1",
      "module": "FD",
      "name": "Founder-held revenue",
      "measures": "Share of last-year revenue from customers where the founder is the primary relationship holder. Shared relationships count at 50%.",
      "type": "numeric",
      "unit": "%",
      "question": "Roughly what percentage of revenue comes from customers who would mainly call you, rather than someone else in the team?",
      "weight": 1.5,
      "blocker": true,
      "bands": {
        "4": "10% or less",
        "3": "10% to 25%",
        "2": "25% to 50%",
        "1": "over 50%"
      },
      "buyerView": {
        "trade": "Earn-out tied to customer retention, typically over two to three years. Buyer may insist on a formal handover period.",
        "pe": "Founder expected to stay and roll equity. Relationship transfer written into the 100-day plan."
      },
      "actions": [
        "Key account transition",
        "Recruit a successor MD or COO"
      ],
      "direction": "lower_better",
      "thresholds": [
        10,
        25,
        50
      ],
      "max": 100
    },
    {
      "id": "FD3",
      "module": "FD",
      "name": "Absence test",
      "measures": "Longest period in the last 24 months the founder was fully unavailable, in working days, and whether anything material went wrong.",
      "type": "numeric",
      "unit": "working days",
      "question": "In the last two years, what is the longest you have been completely unreachable, in working days?",
      "weight": 1.0,
      "blocker": true,
      "bands": {
        "4": "20 working days or more",
        "3": "10 working days to 20 working days",
        "2": "5 working days to 10 working days",
        "1": "below 5 working days"
      },
      "buyerView": {
        "trade": "Buyer has no evidence the business runs without the founder and will price that into the earn-out.",
        "pe": "Investment committee will ask for evidence. Absence of it pushes towards rollover and lock-in."
      },
      "actions": [
        "Planned founder absence",
        "Delegated authority schedule"
      ],
      "direction": "higher_better",
      "thresholds": [
        20,
        10,
        5
      ]
    },
    {
      "id": "MD1",
      "module": "MD",
      "name": "Successor readiness",
      "measures": "Whether a named individual could run the business for six months starting tomorrow.",
      "type": "category",
      "unit": "",
      "question": "If you had to step away for six months starting tomorrow, who would run the business?",
      "weight": 1.5,
      "blocker": true,
      "bands": {
        "4": "Named successor ready now",
        "3": "Named successor ready within 12 months with development",
        "2": "No internal successor, external hire needed",
        "1": "No successor and no plan"
      },
      "buyerView": {
        "trade": "Buyer must supply management or keep the founder. Narrows the buyer universe to those with a bench.",
        "pe": "Hard to back without a CEO. Likely to require a pre-completion hire or a longer founder commitment."
      },
      "actions": [
        "Recruit a successor MD or COO"
      ],
      "options": [
        {
          "key": "ready_now",
          "label": "Named successor ready now",
          "score": 4
        },
        {
          "key": "ready_12m",
          "label": "Named successor ready within 12 months with development",
          "score": 3
        },
        {
          "key": "external_needed",
          "label": "No internal successor, external hire needed",
          "score": 2
        },
        {
          "key": "none",
          "label": "No successor and no plan",
          "score": 1
        }
      ]
    },
    {
      "id": "MD3",
      "module": "MD",
      "name": "Finance function",
      "measures": "Strength of the finance function.",
      "type": "category",
      "unit": "",
      "question": "Who runs your finances day to day?",
      "weight": 1.0,
      "blocker": false,
      "bands": {
        "4": "Qualified FD or FC in house",
        "3": "Qualified part-time or outsourced FD producing monthly packs",
        "2": "Bookkeeper plus external accountant, annual focus",
        "1": "Founder does the finance"
      },
      "buyerView": {
        "trade": "Longer, more expensive due diligence and completion accounts rather than a locked box.",
        "pe": "Buyer will require an FD hire before or at completion. Locked box unlikely."
      },
      "actions": [
        "Recruit a finance director or financial controller",
        "Faster close and full monthly pack"
      ],
      "options": [
        {
          "key": "fd_inhouse",
          "label": "Qualified FD or FC in house",
          "score": 4
        },
        {
          "key": "fd_parttime",
          "label": "Qualified part-time or outsourced FD producing monthly packs",
          "score": 3
        },
        {
          "key": "bookkeeper",
          "label": "Bookkeeper plus external accountant, annual focus",
          "score": 2
        },
        {
          "key": "founder",
          "label": "Founder does the finance",
          "score": 1
        }
      ]
    },
    {
      "id": "EQ1",
      "module": "EQ",
      "name": "Contracted or recurring revenue",
      "measures": "Share of last-year revenue under a recurring contract or a multi-year or framework agreement.",
      "type": "numeric",
      "unit": "%",
      "question": "Roughly what percentage of revenue is under a recurring contract or multi-year agreement?",
      "weight": 1.0,
      "blocker": false,
      "bands": {
        "4": "60% or more",
        "3": "35% to 60%",
        "2": "15% to 35%",
        "1": "below 15%"
      },
      "buyerView": {
        "trade": "Lower visibility, lower multiple. Buyer applies more weight to pipeline risk.",
        "pe": "Harder to support leverage. Equity cheque larger, so price lower."
      },
      "actions": [
        "Contract the revenue"
      ],
      "direction": "higher_better",
      "thresholds": [
        60,
        35,
        15
      ],
      "max": 100
    },
    {
      "id": "EQ2",
      "module": "EQ",
      "name": "Largest customer",
      "measures": "Largest single customer as a share of last-year revenue.",
      "type": "numeric",
      "unit": "%",
      "question": "What percentage of last year's revenue came from your largest customer?",
      "weight": 1.5,
      "blocker": true,
      "bands": {
        "4": "10% or less",
        "3": "10% to 20%",
        "2": "20% to 35%",
        "1": "over 35%"
      },
      "buyerView": {
        "trade": "Earn-out or deferred element tied to retention of that customer. Possible condition to obtain customer consent.",
        "pe": "Concentration discount on the multiple. Some funds will not proceed above 30 to 40%."
      },
      "actions": [
        "Concentration plan"
      ],
      "direction": "lower_better",
      "thresholds": [
        10,
        20,
        35
      ],
      "max": 100
    },
    {
      "id": "EQ5",
      "module": "EQ",
      "name": "Normalisation adjustments",
      "measures": "Total normalisation adjustments as a share of reported EBITDA for the last year.",
      "type": "numeric",
      "unit": "%",
      "question": "Of the profit figure you would present to a buyer, how much comes from adding back one-off or owner costs, as a percentage?",
      "weight": 1.0,
      "blocker": true,
      "bands": {
        "4": "10% or less",
        "3": "10% to 20%",
        "2": "20% to 35%",
        "1": "over 35%"
      },
      "buyerView": {
        "trade": "Unsupported add-backs rejected in due diligence, reducing the EBITDA the multiple applies to.",
        "pe": "Quality of earnings report will test every add-back. Price chips at the confirmatory stage."
      },
      "actions": [
        "Vendor quality of earnings review"
      ],
      "direction": "lower_better",
      "thresholds": [
        10,
        20,
        35
      ]
    },
    {
      "id": "GE1",
      "module": "GE",
      "name": "Customer revenue retention",
      "measures": "Gross revenue retention. Last-year revenue from prior-year customers, capped at each customer's prior-year spend, as a share of prior-year revenue.",
      "type": "numeric",
      "unit": "%",
      "question": "Of last year's customers, roughly what percentage of their spend did you keep this year?",
      "weight": 1.0,
      "blocker": false,
      "bands": {
        "4": "90% or more",
        "3": "80% to 90%",
        "2": "65% to 80%",
        "1": "below 65%"
      },
      "buyerView": {
        "trade": "Buyer discounts the forecast.",
        "pe": "Growth case questioned. Lower entry multiple."
      },
      "actions": [
        "Customer retention review"
      ],
      "direction": "higher_better",
      "thresholds": [
        90,
        80,
        65
      ],
      "max": 100
    },
    {
      "id": "GE3",
      "module": "GE",
      "name": "Pricing power",
      "measures": "Record of price increases over the last 24 months.",
      "type": "category",
      "unit": "",
      "question": "Which best describes your price increases over the last two years?",
      "weight": 1.0,
      "blocker": false,
      "bands": {
        "4": "Increases at or above inflation across most customers with minimal loss",
        "3": "Increases on some customers or products",
        "2": "Ad hoc increases only",
        "1": "No increases or discounting to hold volume"
      },
      "buyerView": {
        "trade": "Margin risk priced in.",
        "pe": "Pricing becomes a value creation lever the buyer claims for itself."
      },
      "actions": [
        "Pricing review"
      ],
      "options": [
        {
          "key": "broad_increase",
          "label": "Increases at or above inflation across most customers with minimal loss",
          "score": 4
        },
        {
          "key": "some_increase",
          "label": "Increases on some customers or products",
          "score": 3
        },
        {
          "key": "ad_hoc",
          "label": "Ad hoc increases only",
          "score": 2
        },
        {
          "key": "none",
          "label": "No increases or discounting to hold volume",
          "score": 1
        }
      ]
    },
    {
      "id": "DD1",
      "module": "DD",
      "name": "Month-end close",
      "measures": "Working days after month end until the management accounts are final.",
      "type": "numeric",
      "unit": "working days",
      "question": "How many working days after month end do you have final monthly numbers?",
      "weight": 1.0,
      "blocker": false,
      "bands": {
        "4": "10 working days or less",
        "3": "10 working days to 20 working days",
        "2": "20 working days to 40 working days",
        "1": "over 40 working days"
      },
      "buyerView": {
        "trade": "Longer due diligence and a completion accounts mechanism.",
        "pe": "Locked box less likely. Reporting upgrade forced on the business post-deal."
      },
      "actions": [
        "Faster close and full monthly pack"
      ],
      "direction": "lower_better",
      "thresholds": [
        10,
        20,
        40
      ],
      "noneOption": {
        "label": "We don't produce monthly accounts",
        "value": 99
      }
    },
    {
      "id": "DD2",
      "module": "DD",
      "name": "Management information",
      "measures": "Content of the monthly management pack.",
      "type": "category",
      "unit": "",
      "question": "What goes into your monthly management pack?",
      "weight": 1.0,
      "blocker": false,
      "bands": {
        "4": "P&L, balance sheet, cash flow and KPIs against budget",
        "3": "P&L against budget",
        "2": "P&L only",
        "1": "No regular monthly pack"
      },
      "buyerView": {
        "trade": "Buyer builds its own analysis, slowing the process.",
        "pe": "Quality of earnings work takes longer and costs more."
      },
      "actions": [
        "Faster close and full monthly pack"
      ],
      "options": [
        {
          "key": "full",
          "label": "P&L, balance sheet, cash flow and KPIs against budget",
          "score": 4
        },
        {
          "key": "pl_budget",
          "label": "P&L against budget",
          "score": 3
        },
        {
          "key": "pl_only",
          "label": "P&L only",
          "score": 2
        },
        {
          "key": "none",
          "label": "No regular monthly pack",
          "score": 1
        }
      ]
    }
  ],
  "otherMeasures": [
    {
      "module": "FD",
      "name": "Founder-only decisions"
    },
    {
      "module": "FD",
      "name": "Knowledge held only by the founder"
    },
    {
      "module": "FD",
      "name": "Founder time in day-to-day operations"
    },
    {
      "module": "FD",
      "name": "Personal ties"
    },
    {
      "module": "MD",
      "name": "Second-line cover"
    },
    {
      "module": "MD",
      "name": "Key people locked in"
    },
    {
      "module": "MD",
      "name": "Top team tenure"
    },
    {
      "module": "MD",
      "name": "Priorities aligned"
    },
    {
      "module": "EQ",
      "name": "Top five customers"
    },
    {
      "module": "EQ",
      "name": "Margin stability"
    },
    {
      "module": "EQ",
      "name": "Cash conversion"
    },
    {
      "module": "GE",
      "name": "Revenue growth"
    },
    {
      "module": "GE",
      "name": "Pipeline evidence"
    },
    {
      "module": "GE",
      "name": "Forecast accuracy"
    },
    {
      "module": "DD",
      "name": "Revenue under written contract"
    },
    {
      "module": "DD",
      "name": "Employment records"
    },
    {
      "module": "DD",
      "name": "IP and assets owned by the company"
    },
    {
      "module": "DD",
      "name": "Legal, tax and corporate housekeeping"
    }
  ]
};
