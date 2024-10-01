import { Company, CompanyPriceClose } from './company-entity';
import { CompanyDto } from './company.dto';

export const presentCompanies = (
  companies: Company[],
  volatilityMap?: Record<string, number>,
) => {
  return companies.map((company) => {
    if (volatilityMap) {
      return presentCompanyWithVolatility(company, volatilityMap[company.id]);
    }
    return presentCompany(company);
  });
};

const presentCompanyWithVolatility = (company, volatility) => {
  return {
    ...presentCompany(company),
    dailyVolatility: volatility,
  };
};

const presentCompany = (company) => {
  const companyDto: CompanyDto = {
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
  if (company.prices) {
    companyDto.prices = presentCompanyClosePrices(company.prices);
  }
  if (company.score) {
    companyDto.score = presentCompanyScore(company.score);
  }

  return companyDto;
};

const presentCompanyClosePrices = (companyClosePrices: CompanyPriceClose[]) => {
  return companyClosePrices.map((entry) => ({
    price: entry.price,
    date: entry.date.toISOString(),
  }));
};

const presentCompanyScore = (companyScore) => {
  return {
    dateGenerated: companyScore.dateGenerated,
    dividend: companyScore.dividend,
    future: companyScore.future,
    health: companyScore.health,
    management: companyScore.management,
    past: companyScore.past,
    value: companyScore.value,
    misc: companyScore.misc,
    total: companyScore.total,
    sentence: companyScore.sentence,
  };
};
