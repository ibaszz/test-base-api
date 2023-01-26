import { Test, TestingModule } from '@nestjs/testing';
import { PemantauanController } from './pemantauan.controller';
import { PemantauanService } from './pemantauan.service';

describe('PemantauanController', () => {
  let controller: PemantauanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemantauanController],
      providers: [PemantauanService],
    }).compile();

    controller = module.get<PemantauanController>(PemantauanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
