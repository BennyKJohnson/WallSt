export const presentCompany = (company) => {
  return {
    name: company.name,
    tickerSymbol: company.tickerSymbol,
    exchangeSymbol: company.exchangeSymbol,
    uniqueSymbol: company.uniqueSymbol,
    canonicalURL: company.canonicalURL,
    uniqueSymbolSlug: company.uniqueSymbolSlug,
    listingCurrencyISO: company.listingCurrencyISO,
    exchangeCountryISO: company.exchangeCountryISO,
    securityName: company.securityName,
  };
};
