import { ApiProperty } from '@nestjs/swagger';

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
}
