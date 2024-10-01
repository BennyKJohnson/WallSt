import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Given a request to /companies without any additional query parameters', () => {
    it('Returns results for 12 companies including score details', async () => {
      const response = await request(app.getHttpServer())
        .get('/companies')
        .expect(200);
      expect(response.body.length).toEqual(12);
      expect(response.body[0]).toEqual({
        name: 'Afterpay',
        tickerSymbol: 'APT',
        exchangeSymbol: 'ASX',
        uniqueSymbol: 'ASX:APT',
        canonicalURL: '/stocks/au/software/asx-apt/afterpay-shares',
        uniqueSymbolSlug: 'asx-apt',
        listingCurrencyISO: 'AUD',
        exchangeCountryISO: 'AU',
        securityName: 'Ordinary Shares',
        score: {
          dateGenerated: '2020-05-24 11:06:28.000000',
          dividend: 0,
          future: 5,
          health: 4,
          management: 0,
          misc: 0,
          past: 0,
          sentence: 'High growth potential with adequate balance sheet.',
          total: 9,
          value: 0,
        },
      });
    });
  });

  describe('Given a request to /companies with exchangeSymbol filter: ASX', () => {
    it('Returns results for 3 companies including score details', async () => {
      const response = await request(app.getHttpServer())
        .get('/companies?exchangeSymbol=ASX')
        .expect(200);
      expect(response.body.length).toEqual(3);
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          tickerSymbol: 'APT',
        }),
      );
      expect(response.body[1]).toEqual(
        expect.objectContaining({
          tickerSymbol: 'BHP',
        }),
      );
      expect(response.body[2]).toEqual(
        expect.objectContaining({
          tickerSymbol: 'TLS',
        }),
      );
    });
  });

  describe('Given a request to /companies with include prices', () => {
    it('Returns results with prices', async () => {
      const response = await request(app.getHttpServer())
        .get('/companies?include=prices')
        .expect(200);
      expect(response.body.length).toEqual(12);
      for (const company of response.body) {
        expect(company.prices).toBeDefined();
      }
    });
  });

  describe('Given a request to /companies with an invalid sort query parameter', () => {
    it('Returns a 400 Bad Request response', async () => {
      await request(app.getHttpServer())
        .get('/companies?sort=invalid')
        .expect(400);
    });
  });
});
