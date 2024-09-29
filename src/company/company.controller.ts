import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './comany.service';
import { presentCompany } from './company-presenter';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CompanyDto } from './presentable-company';

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
  async getCompanies(): Promise<Array<CompanyDto>> {
    const companies = await this.companyService.getCompanies();
    return companies.map((company) => {
      return presentCompany(company);
    });
  }
}
