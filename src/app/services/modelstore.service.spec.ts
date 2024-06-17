import { TestBed } from '@angular/core/testing';

import { ModelstoreService } from './modelstore.service';

describe('ModelstoreService', () => {
  let service: ModelstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
