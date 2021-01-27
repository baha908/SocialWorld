/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicantService } from './applicant.service';

describe('Service: Applicant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicantService]
    });
  });

  it('should ...', inject([ApplicantService], (service: ApplicantService) => {
    expect(service).toBeTruthy();
  }));
});
