import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './comany.service';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CompanyDto } from './company.dto';
import {
  GetCompaniesQueryRequest,
  GetCompanyInclude,
  GetCompanySort,
} from './get-company-query-request.dto';

@Controller({
  path: 'companies',
  version: '1',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({
    description: 'Retrieve all companies',
  })
  @ApiOkResponse({
    description: 'Collection of companies',
    type: [CompanyDto],
  })
  @ApiQuery({
    required: false,
    name: 'include',
    enum: GetCompanyInclude,
    isArray: true,
    description: 'Include additional data such as prices and daily volatility',
    example: Object.keys(GetCompanyInclude),
  })
  @ApiQuery({
    required: false,
    name: 'exchangeSymbol',
    type: String,
    description: 'Filter by exchange symbol',
  })
  @ApiQuery({
    required: false,
    name: 'totalScore',
    type: String,
    description: 'Filter by total score',
  })
  @ApiQuery({
    required: false,
    name: 'sort',
    type: String,
    enum: GetCompanySort,
    description: 'Sort results by a field',
  })
  @ApiQuery({
    required: false,
    name: 'sortAsc',
    type: Boolean,
    description: 'Sort ascending',
  })
  async getCompanies(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetCompaniesQueryRequest,
  ): Promise<Array<CompanyDto>> {
    const includePrices =
      query.include?.includes(GetCompanyInclude.prices) || false;
    const includeDailyVolatility =
      query.include?.includes(GetCompanyInclude.dailyVolatility) || false;

    return this.companyService.getCompanies({
      includePrices,
      includeDailyVolatility,
      exchangeSymbol: query.exchangeSymbol?.toLocaleUpperCase(),
      totalScore: query.totalScore,
      sort: query.sort,
      sortAscending: query.sortAsc,
    });
  }
}
