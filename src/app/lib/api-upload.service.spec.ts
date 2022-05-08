import { TestBed } from '@angular/core/testing';

import { ApiUploadService } from './api-upload.service';

describe('ApiUploadService', () => {
  let service: ApiUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
