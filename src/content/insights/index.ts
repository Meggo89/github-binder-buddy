import reportPlantHireEquipmentRental from './plant-hire-equipment-rental-ma-2026';
import reportPackaging from './packaging-ma-2026';
import reportTestMeasurementInstruments from './test-measurement-instruments-ma-2026';
import reportCommercialInsuranceBrokers from './commercial-insurance-brokers-ma-2026';
import reportFireSecurityLifeSafety from './fire-security-life-safety-ma-2026';
import reportItMspCyber from './it-msp-cyber-ma-2026';
import reportLegalServices from './legal-services-ma-2026';
import reportSpecialistManufacturing from './specialist-manufacturing-ma-2026';
import reportFoodDrinkProducers from './food-drink-producers-ma-2026';
import reportSpecialistDistribution from './specialist-distribution-ma-2026';
import reportCareComplexCare from './care-complex-care-ma-2026';
import reportFacilitiesManagementCleaning from './facilities-management-cleaning-ma-2026';
import reportLogisticsDistribution from './logistics-distribution-ma-2026';
import reportHealthcareServices from './healthcare-services-ma-2026';
import reportEducationTraining from './education-training-ma-2026';
import reportAccountancyPractices from './accountancy-practices-ma-2026';
import reportWealthManagementIfa from './wealth-management-ifa-ma-2026';
import reportSoftwareTechEnabled from './software-tech-enabled-ma-2026';
import reportInsuranceBroking from './insurance-broking-ma-2026';
import reportRecruitmentStaffing from './recruitment-staffing-ma-2026';
import engineeringTechnicalServicesMa2026 from './engineering-technical-services-ma-2026';
import badrChangesApril2027ShouldYouSellBefore from './badr-changes-april-2027-should-you-sell-before';
import foundersRelief2027WhoQualifies from './founders-relief-2027-who-qualifies';
import earnOutsExplainedUk from './earn-outs-explained-uk';
import headsOfTermsWhatIsBinding from './heads-of-terms-what-is-binding';
import ebitdaAddBacksBuyersAccept from './ebitda-add-backs-buyers-accept';
import warrantiesIndemnitiesBusinessSale from './warranties-indemnities-business-sale';
import ukSearchFundsExplained from './uk-search-funds-explained';
import searchFundVsPeVsStrategic from './search-fund-vs-private-equity-vs-strategic';
import rolloverEquityExplained from './rollover-equity-explained';
import twelveMonthsBeforeYouSell from './12-months-before-you-sell';
import accountantVsMarketValuation from './accountant-valuation-vs-market-valuation';
import humanEmployment from './human-employment-ai-era';
import comprehensiveGuide from './comprehensive-guide-business-exits';
import aiInMa from './ai-in-modern-ma-transactions';
import futureOfMaTech from './future-of-ma-technology-sector';
import smeValuations from './sme-valuations-key-considerations';
import postMergerIntegration from './post-merger-integration-success';
import type { Article } from './types';

export type { Article };
export { INSIGHT_LINKS } from './related';

// Display order: newest first. The five sector reports of 23 November 2026 lead, then the fifteen
// sector reports of 16 November 2026, then the six
// articles published earlier in November 2026, then the five pillar articles from August 2026,
// then the earlier long-form pieces.
export const articles: Article[] = [
  reportPlantHireEquipmentRental,
  reportPackaging,
  reportTestMeasurementInstruments,
  reportCommercialInsuranceBrokers,
  reportFireSecurityLifeSafety,
  reportItMspCyber,
  reportLegalServices,
  reportSpecialistManufacturing,
  reportFoodDrinkProducers,
  reportSpecialistDistribution,
  reportCareComplexCare,
  reportFacilitiesManagementCleaning,
  reportLogisticsDistribution,
  reportHealthcareServices,
  reportEducationTraining,
  reportAccountancyPractices,
  reportWealthManagementIfa,
  reportSoftwareTechEnabled,
  reportInsuranceBroking,
  reportRecruitmentStaffing,
  engineeringTechnicalServicesMa2026,
  badrChangesApril2027ShouldYouSellBefore,
  foundersRelief2027WhoQualifies,
  earnOutsExplainedUk,
  headsOfTermsWhatIsBinding,
  ebitdaAddBacksBuyersAccept,
  warrantiesIndemnitiesBusinessSale,
  ukSearchFundsExplained,
  searchFundVsPeVsStrategic,
  rolloverEquityExplained,
  twelveMonthsBeforeYouSell,
  accountantVsMarketValuation,
  humanEmployment,
  comprehensiveGuide,
  aiInMa,
  futureOfMaTech,
  smeValuations,
  postMergerIntegration,
];

const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string | undefined): Article | undefined {
  if (!slug) return undefined;
  return bySlug.get(slug);
}
