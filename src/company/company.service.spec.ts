import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './comany.service';
import { CompanyRepository } from './company-repository.service';

describe('Testing CompanyService', () => {
  let service: CompanyService;
  let repository: CompanyRepository;
  beforeEach(async () => {
    repository = new CompanyRepository('');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: CompanyRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  describe('Given no companes in responsitory', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'getCompanies').mockResolvedValue([]);
    });

    it('should return an empty array', async () => {
      const companies = await service.getCompanies();
      expect(companies).toEqual([]);
    });
  });
});
