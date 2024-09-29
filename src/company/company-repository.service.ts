import * as Database from 'better-sqlite3';
import { Injectable } from '@nestjs/common';
import { Company } from './company-entity';

@Injectable()
export class CompanyRepository {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename, { fileMustExist: true });
    this.db.pragma('journal_mode = WAL');
  }

  async getCompanies(): Promise<Company[]> {
    const stmt = this.db.prepare('SELECT * FROM swsCompany');
    const records = stmt.all();
    return records.map((record) => this.mapRecordToEntity(record));
  }

  mapRecordToEntity(record: Record<string, unknown>): Company {
    return {
      name: record.name as string,
      tickerSymbol: record.ticker_symbol as string,
      exchangeSymbol: record.exchange_symbol as string,
      uniqueSymbol: record.unique_symbol as string,
      canonicalURL: record.canonical_url as string,
      uniqueSymbolSlug: record.unique_symbol_slug as string,
      listingCurrencyISO: record.listing_currency_iso as string,
      exchangeCountryISO: record.exchange_country_iso as string,
      securityName: record.security_name as string,
    };
  }
}
