import { ApiProperty } from '@nestjs/swagger';

export class CompanyClosePriceDto {
  @ApiProperty({
    description: 'The price the stock closed at',
    example: 15.0,
  })
  price: number;

  @ApiProperty({
    description: 'The date of the recorded price',
    example: '2020-03-25T00:00:00.000Z',
  })
  date: string;
}

export class CompanyScoreDto {
  @ApiProperty({
    description: 'The date the score was generated',
    example: '2020-05-24 11:06:28.000000',
  })
  dateGenerated: string;

  @ApiProperty({
    description: 'The stock dividend score',
    example: 5,
  })
  dividend: number;

  @ApiProperty({
    description: 'The stock future score',
    example: 6,
  })
  future: number;

  @ApiProperty({
    description: 'The stock health score',
    example: 4,
  })
  health: number;

  @ApiProperty({
    description: 'The stock management score',
    example: 4,
  })
  management: number;

  @ApiProperty({
    description: 'The stock past score',
    example: 4,
  })
  past: number;

  @ApiProperty({
    description: 'The stock value score',
    example: 4,
  })
  value: number;

  @ApiProperty({
    description: 'The stock misc score',
    example: 1,
  })
  misc: number;

  @ApiProperty({
    description: 'The stock total score',
    example: 9,
  })
  total: number;

  @ApiProperty({
    description: 'sentence describing the stock score',
    example: 'High growth potential with adequate balance sheet.',
  })
  sentence: string;
}

export class CompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    example: 'Apple',
  })
  name: string;

  @ApiProperty({
    description: 'The ticker symbol of the company',
    example: 'AAPL',
  })
  tickerSymbol: string;

  @ApiProperty({
    description: 'The exchange symbol of the company',
    example: 'NasdaqGS',
  })
  exchangeSymbol: string;

  @ApiProperty({
    description: 'The unique symbol of the company',
    example: 'NasdaqGS:AAPL',
  })
  uniqueSymbol: string;

  @ApiProperty({
    description: 'The canonical URL of the company',
    example: '/stocks/us/tech/nasdaq-aapl/apple',
  })
  canonicalURL: string;

  @ApiProperty({
    description: 'The unique symbol slug of the company',
    example: 'nasdaq-aapl',
  })
  uniqueSymbolSlug: string;

  @ApiProperty({
    description: 'The listing currency ISO of the company',
    example: 'USD',
  })
  listingCurrencyISO: string;

  @ApiProperty({
    description: 'The exchange country ISO of the company',
    example: 'US',
  })
  exchangeCountryISO: string;

  @ApiProperty({
    description: 'The security name of the company',
    example: 'Common Stock',
  })
  securityName: string;

  @ApiProperty({
    description: 'The recorded close prices',
    type: [CompanyClosePriceDto],
  })
  prices?: CompanyClosePriceDto[];

  @ApiProperty({
    description: 'The company score',
    type: CompanyScoreDto,
  })
  score?: CompanyScoreDto;

  @ApiProperty({
    description: 'The daily volatility of the stock',
    example: 0.02,
  })
  dailyVolatility?: number;
}
