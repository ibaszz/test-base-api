import { Test, TestingModule } from '@nestjs/testing';
import { PemantauanService } from './pemantauan.service';

describe('PemantauanService', () => {
  let service: PemantauanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemantauanService],
    }).compile();

    service = module.get<PemantauanService>(PemantauanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
