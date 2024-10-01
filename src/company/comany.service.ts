import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company-repository.service';
import { Company } from './company-entity';
import { calculateDailyVolatility } from './daily-volatility.util';
import { presentCompanies } from './company-presenter';
import { CompanyDto } from './company.dto';

interface GetCompaniesRequest {
  includePrices: boolean;
  includeDailyVolatility: boolean;
  exchangeSymbol?: string;
  totalScore?: number;
  sort?: string;
  sortAscending?: boolean;
}

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async getCompanies(options: GetCompaniesRequest): Promise<CompanyDto[]> {
    const orderBy = options.sort === 'totalScore' ? 'score' : undefined;

    const shouldIncludePrices =
      options.includePrices || options.includeDailyVolatility;
    const companies = await this.companyRepository.getCompanies({
      where: {
        exchangeSymbol: options.exchangeSymbol,
        totalScore: options.totalScore,
      },
      include: {
        prices: shouldIncludePrices,
        score: true, // Always include score
      },
      orderBy,
      sortAsc: options.sortAscending,
    });

    if (options.includeDailyVolatility) {
      // Calculate the volatility for each company is not optimal
      // It would be better to store the calculated volatility in the database
      const volatilityMap = await this.calculateCompaniesVolatility(companies);
      return presentCompanies(companies, volatilityMap);
    }

    return presentCompanies(companies);
  }

  private async calculateCompaniesVolatility(
    companies: Company[],
  ): Promise<Record<string, number>> {
    const volatilityMap = {};
    for (const company of companies) {
      const volatility = calculateDailyVolatility(
        company.prices.map((p) => p.price),
      );
      volatilityMap[company.id] = volatility;
    }
    return volatilityMap;
  }
}
