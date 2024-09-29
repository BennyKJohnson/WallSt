import { CompanyRepository } from './../src/company/company-repository.service';

describe('Testing CompanyRepository', () => {
  describe('Given the simply wallst sqlite database', () => {
    describe('When getting companies', () => {
      it('Then should return all records in the swsCompany table', async () => {
        const repository = new CompanyRepository(
          process.env.SWS_DATABASE_FILENAME,
        );
        const companies = await repository.getCompanies();
        expect(companies.length).toEqual(12);
        expect(companies[0]).toEqual({
          name: 'Afterpay',
          tickerSymbol: 'APT',
          exchangeSymbol: 'ASX',
          uniqueSymbol: 'ASX:APT',
          canonicalURL: '/stocks/au/software/asx-apt/afterpay-shares',
          uniqueSymbolSlug: 'asx-apt',
          listingCurrencyISO: 'AUD',
          exchangeCountryISO: 'AU',
          securityName: 'Ordinary Shares',
        });
      });
    });
  });
});
