import { presentCompanies } from './company-presenter';

describe('Testing Company Presenter', () => {
  const expectedAPTDto = {
    name: 'Afterpay',
    tickerSymbol: 'APT',
    exchangeSymbol: 'ASX',
    uniqueSymbol: 'ASX:APT',
    canonicalURL: '/stocks/au/software/asx-apt/afterpay-shares',
    uniqueSymbolSlug: 'asx-apt',
    listingCurrencyISO: 'AUD',
    exchangeCountryISO: 'AU',
    securityName: 'Ordinary Shares',
  };

  const expectedTSLADto = {
    name: 'Tesla',
    tickerSymbol: 'TSLA',
    exchangeSymbol: 'NasdaqGS',
    uniqueSymbol: 'NasdaqGS:TSLA',
    canonicalURL: '/stocks/us/automobiles/nasdaq-tsla/tesla',
    uniqueSymbolSlug: 'nasdaq-tsla',
    listingCurrencyISO: 'USD',
    exchangeCountryISO: 'US',
    securityName: 'Ordinary Shares',
    prices: [
      {
        price: 100,
        date: '2020-01-01T00:00:00.000Z',
      },
      {
        price: 200,
        date: '2020-01-02T00:00:00.000Z',
      },
    ],
  };

  describe('Given a list of companies', () => {
    const companies = [
      {
        name: 'Afterpay',
        tickerSymbol: 'APT',
        exchangeSymbol: 'ASX',
        uniqueSymbol: 'ASX:APT',
        canonicalURL: '/stocks/au/software/asx-apt/afterpay-shares',
        uniqueSymbolSlug: 'asx-apt',
        listingCurrencyISO: 'AUD',
        exchangeCountryISO: 'AU',
        securityName: 'Ordinary Shares',
        id: 'AFTERPAY-ID',
      },
      {
        name: 'Tesla',
        tickerSymbol: 'TSLA',
        exchangeSymbol: 'NasdaqGS',
        uniqueSymbol: 'NasdaqGS:TSLA',
        canonicalURL: '/stocks/us/automobiles/nasdaq-tsla/tesla',
        uniqueSymbolSlug: 'nasdaq-tsla',
        listingCurrencyISO: 'USD',
        exchangeCountryISO: 'US',
        securityName: 'Ordinary Shares',
        id: 'TESLA-ID',
        prices: [
          {
            price: 100,
            date: new Date('2020-01-01'),
          },
          {
            price: 200,
            date: new Date('2020-01-02'),
          },
        ],
      },
    ];

    describe('When presenting companies without volatility', () => {
      it('Then returns a list of company DTOs without volatility', () => {
        const result = presentCompanies(companies);
        expect(result).toEqual([expectedAPTDto, expectedTSLADto]);
      });
    });

    describe('Given a volatility map for each company', () => {
      describe('When presenting companies with volatility', () => {
        it('Then returns a list of company DTOs with daily volatility', () => {
          const result = presentCompanies(companies, {
            'AFTERPAY-ID': 0.5,
            'TESLA-ID': 1.5,
          });
          expect(result).toEqual([
            {
              ...expectedAPTDto,
              dailyVolatility: 0.5,
            },
            {
              ...expectedTSLADto,
              dailyVolatility: 1.5,
            },
          ]);
        });
      });
    });
  });
});
