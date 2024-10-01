import * as Database from 'better-sqlite3';
import { Injectable } from '@nestjs/common';
import { Company, CompanyPriceClose, CompanyScore } from './company-entity';
import {
  companyColumns,
  companyPriceCloseColumns,
  companyScoreColumns,
} from './company-db-schema';

export interface GetCompaniesQueryRequest {
  include: {
    prices: boolean;
    score: boolean;
  };
  where: {
    exchangeSymbol?: string;
    totalScore?: number;
  };
  orderBy?: string;
  sortAsc: boolean;
}

/*
The class is responsible for querying the database and returning the results.
It uses the better-sqlite3 library to interact with the SQLite database.
In a larger production system an ORM (higher level database abstraction) library like TypeORM or Prisma would be used for query generation and result mapping.
*/
@Injectable()
export class CompanyRepository {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename, { fileMustExist: true });
    this.db.pragma('journal_mode = WAL');
  }

  /*
  The getCompanies method queries the database for companies based on the provided request.
  A possible improvement would be to introduce a caching layer such as redis to reduce the number of database queries.
  */
  async getCompanies(
    request: GetCompaniesQueryRequest = {
      include: {
        prices: false,
        score: false,
      },
      where: {
        exchangeSymbol: undefined,
        totalScore: undefined,
      },
      orderBy: undefined,
      sortAsc: true,
    },
  ): Promise<Company[]> {
    const { joins, selectColComponents } =
      this.prepareJoinsForGetCompaniesQuery(request);

    const selectCols = [
      this.prepareSelectColComponents('swsCompany', companyColumns),
      ...selectColComponents,
    ].join(',');

    const companySelect = `SELECT ${selectCols} FROM swsCompany`;
    let statement = [companySelect, ...joins].join(' ');

    const { whereConditions, parameters } =
      this.prepareWhereConditionsForGetCompaniesQuery(request);
    if (whereConditions.length) {
      statement += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    if (request.orderBy) {
      if (request.orderBy === 'score') {
        statement += ` ORDER BY swsCompanyScore.total ${request.sortAsc ? 'ASC' : 'DESC'}`;
      } else {
        throw new Error(`Invalid orderBy field: ${request.orderBy}`);
      }
    }

    const stmt = this.db.prepare(statement);

    const records = stmt.all(parameters);
    return this.mapRecordsToCompanies(records);
  }

  private prepareWhereConditionsForGetCompaniesQuery(
    request: GetCompaniesQueryRequest,
  ) {
    const parameters = [];
    const whereConditions = [];
    if (request.where.exchangeSymbol) {
      whereConditions.push('swsCompany.exchange_symbol = ?');
      parameters.push(request.where.exchangeSymbol);
    }

    if (request.where.totalScore) {
      whereConditions.push('swsCompanyScore.total = ?');
      parameters.push(request.where.totalScore);
    }
    return { whereConditions, parameters };
  }

  private prepareJoinsForGetCompaniesQuery(request: GetCompaniesQueryRequest) {
    const joins = [];
    const selectColComponents = [];
    if (request.include.prices) {
      const companyPriceCloseSelectCols = this.prepareSelectColComponents(
        'swsCompanyPriceClose',
        companyPriceCloseColumns,
      );
      selectColComponents.push(companyPriceCloseSelectCols);
      const companyPriceCloseJoin =
        'FULL OUTER JOIN swsCompanyPriceClose ON swsCompany.id = swsCompanyPriceClose.company_id';
      joins.push(companyPriceCloseJoin);
    }

    if (request.include.score) {
      const companyScoreSelectCols = this.prepareSelectColComponents(
        'swsCompanyScore',
        companyScoreColumns,
      );
      selectColComponents.push(companyScoreSelectCols);
      const companyScoreJoin =
        'JOIN swsCompanyScore ON swsCompany.id = swsCompanyScore.company_id';
      joins.push(companyScoreJoin);
    }
    return { joins, selectColComponents };
  }

  private prepareSelectColComponents(tableName: string, columns: string[]) {
    return columns
      .map((col) => `${tableName}.${col} as \`${tableName}->${col}\``)
      .join(',');
  }

  private mapRecordsToCompanies(
    records: Record<string, string | number>[],
  ): Company[] {
    const companyRecords = {} as Record<string, Company>;
    records.forEach((record) => {
      if (!companyRecords[record['swsCompany->id']]) {
        companyRecords[record['swsCompany->id']] =
          this.mapRecordToCompany(record);
      }
      if (record['swsCompanyPriceClose->price']) {
        companyRecords[record['swsCompany->id']].prices = [
          ...(companyRecords[record['swsCompany->id']].prices || []),
          this.mapRecordToCompanyPriceClose(record),
        ];
      }
      if (record['swsCompanyScore->company_id']) {
        companyRecords[record['swsCompanyScore->company_id']].score =
          this.mapRecordToCompanyScore(record);
      }
    });

    return Object.values(companyRecords);
  }

  private mapRecordToCompanyPriceClose(
    record: Record<string, unknown>,
  ): CompanyPriceClose {
    return {
      date: new Date(
        Date.parse(record['swsCompanyPriceClose->date'] as string),
      ),
      price: record['swsCompanyPriceClose->price'] as number,
    };
  }

  private mapRecordToCompany(record: Record<string, unknown>): Company {
    return {
      id: record['swsCompany->id'] as string,
      name: record['swsCompany->name'] as string,
      tickerSymbol: record['swsCompany->ticker_symbol'] as string,
      exchangeSymbol: record['swsCompany->exchange_symbol'] as string,
      uniqueSymbol: record['swsCompany->unique_symbol'] as string,
      canonicalURL: record['swsCompany->canonical_url'] as string,
      uniqueSymbolSlug: record['swsCompany->unique_symbol_slug'] as string,
      listingCurrencyISO: record['swsCompany->listing_currency_iso'] as string,
      exchangeCountryISO: record['swsCompany->exchange_country_iso'] as string,
      securityName: record['swsCompany->security_name'] as string,
    };
  }

  private mapRecordToCompanyScore(
    record: Record<string, string | number>,
  ): CompanyScore {
    return {
      dateGenerated: record['swsCompanyScore->date_generated'] as string,
      dividend: record['swsCompanyScore->dividend'] as number,
      future: record['swsCompanyScore->future'] as number,
      health: record['swsCompanyScore->health'] as number,
      management: record['swsCompanyScore->management'] as number,
      past: record['swsCompanyScore->past'] as number,
      value: record['swsCompanyScore->value'] as number,
      misc: record['swsCompanyScore->misc'] as number,
      total: record['swsCompanyScore->total'] as number,
      sentence: record['swsCompanyScore->sentence'] as string,
    };
  }
}
