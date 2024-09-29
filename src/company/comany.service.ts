import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company-repository.service';
import { Company } from './company-entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.getCompanies();
  }
}
