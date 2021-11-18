/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeployService } from './deploy.service';

describe('Service: Deploy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeployService]
    });
  });

  it('should ...', inject([DeployService], (service: DeployService) => {
    expect(service).toBeTruthy();
  }));
});
