import { TestBed, inject } from '@angular/core/testing';

import { ControlService } from '@app/shared/control.service';

describe('ControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlService]
    });
  });

  it('should be created', inject([ControlService], (service: ControlService) => {
    expect(service).toBeTruthy();
  }));
});
