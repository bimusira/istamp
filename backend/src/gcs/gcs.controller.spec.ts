import { Test, TestingModule } from '@nestjs/testing';
import { GcsController } from './gcs.controller';

describe('GcsController', () => {
  let controller: GcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcsController],
    }).compile();

    controller = module.get<GcsController>(GcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
