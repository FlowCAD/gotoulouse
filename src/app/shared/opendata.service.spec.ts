import { TestBed, inject } from '@angular/core/testing';

import { OpendataService } from './opendata.service';

describe('OpendataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpendataService]
    });
  });

  it('should be created', inject([OpendataService], (service: OpendataService) => {
    expect(service).toBeTruthy();
  }));
});
