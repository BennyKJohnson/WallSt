import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './comany.service';
import { CompanyRepositoryFactory } from './company-repository.factory';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepositoryFactory],
})
export class CompanyModule {}
