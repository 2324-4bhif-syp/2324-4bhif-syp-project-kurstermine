import { TestBed } from '@angular/core/testing';

import { InstructorApiService } from './instructor-api.service';

describe('InstructorApiService', () => {
  let service: InstructorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
