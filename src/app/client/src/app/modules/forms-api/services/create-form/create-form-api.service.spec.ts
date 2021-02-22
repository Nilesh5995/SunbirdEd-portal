import { TestBed } from '@angular/core/testing';

import { CreateFormApiService } from './create-form-api.service';

describe('CreateFormApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateFormApiService = TestBed.get(CreateFormApiService);
    expect(service).toBeTruthy();
  });
});
