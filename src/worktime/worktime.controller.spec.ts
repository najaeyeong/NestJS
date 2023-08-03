import { Test, TestingModule } from '@nestjs/testing';
import { WorktimeController } from './worktime.controller';

describe('WorktimeController', () => {
  let controller: WorktimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorktimeController],
    }).compile();

    controller = module.get<WorktimeController>(WorktimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
