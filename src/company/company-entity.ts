export interface Company {
  id: string;
  name: string;
  tickerSymbol: string;
  exchangeSymbol: string;
  uniqueSymbol: string;
  canonicalURL: string;
  uniqueSymbolSlug: string;
  listingCurrencyISO: string;
  exchangeCountryISO: string;
  securityName: string;
  prices?: CompanyPriceClose[];
  score?: CompanyScore;
}

export interface CompanyPriceClose {
  date: Date;
  price: number;
}

export interface CompanyScore {
  dateGenerated: string;
  dividend: number;
  future: number;
  health: number;
  management: number;
  past: number;
  value: number;
  misc: number;
  total: number;
  sentence: string;
}
