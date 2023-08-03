import { Test, TestingModule } from '@nestjs/testing';
import { WorktimeService } from './worktime.service';

describe('WorktimeService', () => {
  let service: WorktimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorktimeService],
    }).compile();

    service = module.get<WorktimeService>(WorktimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
