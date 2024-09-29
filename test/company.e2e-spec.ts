import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/companies (GET)', async () => {
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
    });
  });
});
