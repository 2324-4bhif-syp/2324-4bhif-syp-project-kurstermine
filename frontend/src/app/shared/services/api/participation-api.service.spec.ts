import { TestBed } from '@angular/core/testing';

import { ParticipationApiService } from './participation-api.service';

describe('ParticipationApiService', () => {
  let service: ParticipationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
