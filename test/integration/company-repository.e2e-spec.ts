import { CompanyRepository } from '../../src/company/company-repository.service';

describe('Testing CompanyRepository', () => {
  describe('Given a company repository loaded with the simply wallst sqlite database', () => {
    let repository: CompanyRepository;
    beforeAll(() => {
      repository = new CompanyRepository(process.env.SWS_DATABASE_FILENAME);
    });

    const expectedAfterPayCompany = {
      name: 'Afterpay',
      tickerSymbol: 'APT',
      exchangeSymbol: 'ASX',
      uniqueSymbol: 'ASX:APT',
      canonicalURL: '/stocks/au/software/asx-apt/afterpay-shares',
      uniqueSymbolSlug: 'asx-apt',
      listingCurrencyISO: 'AUD',
      exchangeCountryISO: 'AU',
      securityName: 'Ordinary Shares',
      id: '46B285BC-B25F-4814-985C-390A4BFA2023',
    };

    describe('When getting companies including prices', () => {
      it('Then should return all records in the swsCompany table with prices', async () => {
        const companies = await repository.getCompanies({
          include: {
            prices: true,
            score: false,
          },
          where: {},
          sortAsc: false,
        });

        expect(companies.length).toEqual(12);
        expect(companies[0]).toEqual({
          ...expectedAfterPayCompany,
          prices: expect.any(Array),
        });
      });
    });

    describe('When getting companies including score', () => {
      it('Then should return all records in the swsCompany table with scores', async () => {
        const companies = await repository.getCompanies({
          include: {
            prices: false,
            score: true,
          },
          where: {},
          sortAsc: false,
        });

        expect(companies.length).toEqual(12);
        expect(companies[0]).toEqual({
          ...expectedAfterPayCompany,
          score: {
            dateGenerated: '2020-05-24 11:06:28.000000',
            dividend: 0,
            future: 5,
            health: 4,
            management: 0,
            past: 0,
            value: 0,
            misc: 0,
            total: 9,
            sentence: 'High growth potential with adequate balance sheet.',
          },
        });
      });
    });

    describe('When getting companies including prices and score', () => {
      it('Then should return all records in the swsCompany table with prices and score', async () => {
        const companies = await repository.getCompanies({
          include: {
            prices: true,
            score: true,
          },
          where: {},
          sortAsc: false,
        });

        expect(companies.length).toEqual(12);
        expect(companies[0]).toEqual({
          ...expectedAfterPayCompany,
          prices: expect.any(Array),
          score: {
            dateGenerated: '2020-05-24 11:06:28.000000',
            dividend: 0,
            future: 5,
            health: 4,
            management: 0,
            past: 0,
            value: 0,
            misc: 0,
            total: 9,
            sentence: 'High growth potential with adequate balance sheet.',
          },
        });
      });
    });

    describe('When getting companies with an exchange filter of asx', () => {
      it('Then should return all asx companies from the swsCompany', async () => {
        const companies = await repository.getCompanies({
          include: {
            prices: false,
            score: false,
          },
          where: {
            exchangeSymbol: 'ASX',
          },
          sortAsc: false,
        });

        expect(companies.length).toEqual(3);
        expect(companies[0]).toEqual({
          ...expectedAfterPayCompany,
        });
      });
    });
  });
});
