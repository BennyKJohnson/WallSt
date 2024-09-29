import { CompanyRepository } from './company-repository.service';

export const CompanyRepositoryFactory = {
  provide: CompanyRepository,
  inject: [],
  useFactory: () => {
    return new CompanyRepository(process.env.SWS_DATABASE_FILENAME);
  },
};
