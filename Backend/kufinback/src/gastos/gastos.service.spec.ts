import { Test, TestingModule } from '@nestjs/testing';
import { GastosService } from './gastos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';

describe('GastosService', () => {
  let service: GastosService;

  const mockGastoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GastosService,
        {
          provide: getRepositoryToken(Gasto),
          useValue: mockGastoRepository,
        },
      ],
    }).compile();

    service = module.get<GastosService>(GastosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
