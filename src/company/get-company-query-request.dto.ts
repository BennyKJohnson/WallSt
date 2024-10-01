import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export enum GetCompanyInclude {
  prices = 'prices',
  dailyVolatility = 'dailyVolatility',
}

export enum GetCompanySort {
  totalScore = 'totalScore',
}

export class GetCompaniesQueryRequest {
  @IsOptional()
  @IsEnum(GetCompanyInclude, { each: true })
  include: GetCompanyInclude[];

  @IsOptional()
  @IsString()
  exchangeSymbol: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  totalScore: number;

  @IsEnum(GetCompanySort)
  @IsOptional()
  sort?: string;

  @IsBoolean()
  @IsOptional()
  sortAsc?: boolean;
}
