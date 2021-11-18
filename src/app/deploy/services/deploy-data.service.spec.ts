/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeployDataService } from './deploy-data.service';

describe('Service: DeployData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeployDataService]
    });
  });

  it('should ...', inject([DeployDataService], (service: DeployDataService) => {
    expect(service).toBeTruthy();
  }));
});
