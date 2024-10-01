import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './comany.service';
import { CompanyRepository } from './company-repository.service';
import { CompanyDto } from './company.dto';

describe('Testing CompanyService', () => {
  let service: CompanyService;
  let repository: CompanyRepository;
  beforeAll(async () => {
    repository = new CompanyRepository('');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: CompanyRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  describe('Given no companes in responsitory', () => {
    let companies: CompanyDto[];
    beforeAll(async () => {
      jest.spyOn(repository, 'getCompanies').mockResolvedValue([]);
      companies = await service.getCompanies({
        includePrices: false,
        includeDailyVolatility: false,
      });
    });

    it('should call company responsitory with correct request', () => {
      expect(repository.getCompanies).toHaveBeenCalledWith({
        where: {},
        include: {
          prices: false,
          score: true,
        },
        orderBy: undefined,
        sortAsc: undefined,
      });
    });

    it('should return an empty array', async () => {
      expect(companies).toEqual([]);
    });
  });

  describe('Given companies in responsitory', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'getCompanies').mockResolvedValue([
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
          id: '46B285BC-B25F-4814-985C-390A4BFA2023',
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
      ]);
    });

    describe('When getting companies without prices and volatility', () => {
      it('should return all presented companies with daily volatility', async () => {
        const companies = await service.getCompanies({
          includePrices: false,
          includeDailyVolatility: true,
        });
        expect(companies.length).toEqual(1);
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
          dailyVolatility: expect.any(Number),
        });
      });
    });
  });
});
