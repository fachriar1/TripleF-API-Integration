import {Test, TestingModule} from '@nestjs/testing';
import {PointDbService} from './point-db.service';

describe('PointDbService', () => {
  let service: PointDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointDbService],
    }).compile();

    service = module.get<PointDbService>(PointDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
