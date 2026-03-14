export interface CompanySearch {
  symbol: string;
  name: string;
  currency: string;
  exchangeFullName: string;
  exchange: string;
}

export interface CompanyProfile {
 symbol: string;
  price: number;
  marketCap: number;
  beta: number;
  lastDividend: number;
  range: string;
  change: number;
  changePercentage: number;
  volume: number;
  averageVolume: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchangeFullName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string; 
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export interface CompanyKeyRatios {
  dividendYielTTM: number;
  dividendYielPercentageTTM: number;
  peRatioTTM: number;
  pegRatioTTM: number;
  payoutRatioTTM: number;
  currentRatioTTM: number;
  quickRatioTTM: number;
  cashRatioTTM: number;
  daysOfSalesOutstandingTTM: number;
  daysOfInventoryOutstandingTTM: number;
  operatingCycleTTM: number;
  daysOfPayablesOutstandingTTM: number;
  cashConversionCycleTTM: number;
  grossProfitMarginTTM: number;
  operatingProfitMarginTTM: number;
  pretaxProfitMarginTTM: number;
  netProfitMarginTTM: number;
  effectiveTaxRateTTM: number;
  returnOnAssetsTTM: number;
  returnOnEquityTTM: number;
  returnOnCapitalEmployedTTM: number;
  netIncomePerEBTTTM: number;
  ebtPerEbitTTM: number;
  ebitPerRevenueTTM: number;
  debtRatioTTM: number;
  debtEquityRatioTTM: number;
  longTermDebtToCapitalizationTTM: number;
  totalDebtToCapitalizationTTM: number;
  interestCoverageTTM: number;
  cashFlowToDebtRatioTTM: number;
  companyEquityMultiplierTTM: number;
  receivablesTurnoverTTM: number;
  payablesTurnoverTTM: number;
  inventoryTurnoverTTM: number;
  fixedAssetTurnoverTTM: number;
  assetTurnoverTTM: number;
  operatingCashFlowPerShareTTM: number;
  freeCashFlowPerShareTTM: number;
  cashPerShareTTM: number;
  operatingCashFlowSalesRatioTTM: number;
  freeCashFlowOperatingCashFlowRatioTTM: number;
  cashFlowCoverageRatiosTTM: number;
  shortTermCoverageRatiosTTM: number;
  capitalExpenditureCoverageRatioTTM: number;
  dividendPaidAndCapexCoverageRatioTTM: number;
  priceBookValueRatioTTM: number;
  priceToBookRatioTTM: number;
  priceToSalesRatioTTM: number;
  priceEarningsRatioTTM: number;
  priceToFreeCashFlowsRatioTTM: number;
  priceToOperatingCashFlowsRatioTTM: number;
  priceCashFlowRatioTTM: number;
  priceEarningsToGrowthRatioTTM: number;
  priceSalesRatioTTM: number;
  dividendYieldTTM: number;
  enterpriseValueMultipleTTM: number;
  priceFairValueTTM: number;
  dividendPerShareTTM: number;
}

export interface CompanyIncomeStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string; // Corrected spelling (was fillingDate)
  acceptedDate: string;
  fiscalYear: string; // Changed from calendarYear
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  netInterestIncome: number; // New field
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebit: number; // New field
  nonOperatingIncomeExcludingInterest: number; // New field
  operatingIncome: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  netIncomeFromContinuingOperations: number; // New field
  netIncomeFromDiscontinuedOperations: number; // New field
  otherAdjustmentsToNetIncome: number; // New field
  netIncome: number;
  netIncomeDeductions: number; // New field
  bottomLineNetIncome: number; // New field
  eps: number;
  epsDiluted: number; // Corrected casing (was epsdiluted)
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
}

export interface CompanyBalanceSheet {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;

  // Assets
  cashAndCashEquivalents: number;
  shortTermInvestments: number;
  cashAndShortTermInvestments: number;
  netReceivables: number;
  accountsReceivables: number;
  otherReceivables: number;
  inventory: number;
  prepaids: number;
  otherCurrentAssets: number;
  totalCurrentAssets: number;

  propertyPlantEquipmentNet: number;
  goodwill: number;
  intangibleAssets: number;
  goodwillAndIntangibleAssets: number;
  longTermInvestments: number;
  taxAssets: number;
  otherNonCurrentAssets: number;
  totalNonCurrentAssets: number;

  otherAssets: number;
  totalAssets: number;

  // Liabilities
  totalPayables: number;
  accountPayables: number;
  otherPayables: number;
  accruedExpenses: number;
  shortTermDebt: number;
  capitalLeaseObligationsCurrent: number;
  taxPayables: number;
  deferredRevenue: number;
  otherCurrentLiabilities: number;
  totalCurrentLiabilities: number;

  longTermDebt: number;
  deferredRevenueNonCurrent: number;
  deferredTaxLiabilitiesNonCurrent: number;
  otherNonCurrentLiabilities: number;
  totalNonCurrentLiabilities: number;

  otherLiabilities: number;
  capitalLeaseObligations: number;
  totalLiabilities: number;

  // Equity
  treasuryStock: number;
  preferredStock: number;
  commonStock: number;
  retainedEarnings: number;
  additionalPaidInCapital: number;
  accumulatedOtherComprehensiveIncomeLoss: number;
  otherTotalStockholdersEquity: number;
  totalStockholdersEquity: number;
  totalEquity: number;

  minorityInterest: number;

  // Totals
  totalLiabilitiesAndTotalEquity: number;
  totalInvestments: number;
  totalDebt: number;
  netDebt: number;
}

export interface CompanyCashFlow {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string; // Fixed typo: changed from fillingDate
  acceptedDate: string;
  fiscalYear: string; // Changed from calendarYear to match endpoint
  period: string;
  netIncome: number;
  depreciationAndAmortization: number;
  deferredIncomeTax: number;
  stockBasedCompensation: number;
  changeInWorkingCapital: number;
  accountsReceivables: number;
  inventory: number;
  accountsPayables: number;
  otherWorkingCapital: number;
  otherNonCashItems: number;
  netCashProvidedByOperatingActivities: number;
  investmentsInPropertyPlantAndEquipment: number;
  acquisitionsNet: number;
  purchasesOfInvestments: number;
  salesMaturitiesOfInvestments: number;
  otherInvestingActivities: number; // Fixed typo: Activites -> Activities
  netCashProvidedByInvestingActivities: number; // Updated name to match JSON
  netDebtIssuance: number; // Added
  longTermNetDebtIssuance: number; // Added
  shortTermNetDebtIssuance: number; // Added
  netStockIssuance: number; // Added
  netCommonStockIssuance: number; // Added
  commonStockIssuance: number; // Added
  commonStockRepurchased: number;
  netPreferredStockIssuance: number; // Added
  netDividendsPaid: number; // Added
  commonDividendsPaid: number; // Added
  preferredDividendsPaid: number; // Added
  otherFinancingActivities: number; // Fixed typo: Activites -> Activities
  netCashProvidedByFinancingActivities: number; // Updated name to match JSON
  effectOfForexChangesOnCash: number;
  netChangeInCash: number;
  cashAtEndOfPeriod: number;
  cashAtBeginningOfPeriod: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  incomeTaxesPaid: number; // Added
  interestPaid: number; // Added
  // Note: 'link' and 'finalLink' were not in the provided JSON endpoint, 
  // but I've left them out or you can keep them as optional:
  link?: string;
  finalLink?: string;
}

export interface CompanyKeyMetrics {
  symbol: string;
  marketCap: number;
  enterpriseValueTTM: number;
  evToSalesTTM: number;
  evToOperatingCashFlowTTM: number;
  evToFreeCashFlowTTM: number;
  evToEBITDATTM: number;
  netDebtToEBITDATTM: number;
  currentRatioTTM: number;
  incomeQualityTTM: number;
  grahamNumberTTM: number;
  grahamNetNetTTM: number;
  taxBurdenTTM: number;
  interestBurdenTTM: number;
  workingCapitalTTM: number;
  investedCapitalTTM: number;
  returnOnAssetsTTM: number;
  operatingReturnOnAssetsTTM: number;
  returnOnTangibleAssetsTTM: number;
  returnOnEquityTTM: number;
  returnOnInvestedCapitalTTM: number;
  returnOnCapitalEmployedTTM: number;
  earningsYieldTTM: number;
  freeCashFlowYieldTTM: number;
  capexToOperatingCashFlowTTM: number;
  capexToDepreciationTTM: number;
  capexToRevenueTTM: number;
  salesGeneralAndAdministrativeToRevenueTTM: number;
  researchAndDevelopementToRevenueTTM: number;
  stockBasedCompensationToRevenueTTM: number;
  intangiblesToTotalAssetsTTM: number;
  averageReceivablesTTM: number;
  averagePayablesTTM: number;
  averageInventoryTTM: number;
  daysOfSalesOutstandingTTM: number;
  daysOfPayablesOutstandingTTM: number;
  daysOfInventoryOutstandingTTM: number;
  operatingCycleTTM: number;
  cashConversionCycleTTM: number;
  freeCashFlowToEquityTTM: number;
  freeCashFlowToFirmTTM: number;
  tangibleAssetValueTTM: number;
  netCurrentAssetValueTTM: number;
}

export interface CompanyHistoricalDividend {
  symbol: string;
  historical: Dividend[];
}

export interface Dividend {
  date: string;
  label: string;
  adjDividend: number;
  dividend: number;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
}

export interface CompanyCompData {
  symbol: string;         // The parent company identifier
  companyName: string;   // Full name of the peer company
  price: number;         // Current stock price
  mktCap: number;        // Market Capitalization
}

export interface CompanyTenK {
  symbol: string;
  cik: string;
  filingDate: string; // Fixed typo: fillingDate -> filingDate
  acceptedDate: string;
  formType: string;   // Changed from 'type' to 'formType'
  link: string;
  finalLink: string;
}
