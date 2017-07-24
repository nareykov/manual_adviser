import { TestBed, inject } from '@angular/core/testing';

import { TagcloudHttpService } from './tagcloud-http.service';

describe('TagcloudHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagcloudHttpService]
    });
  });

  it('should be created', inject([TagcloudHttpService], (service: TagcloudHttpService) => {
    expect(service).toBeTruthy();
  }));
});
