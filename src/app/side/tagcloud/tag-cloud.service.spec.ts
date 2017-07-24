import { TestBed, inject } from '@angular/core/testing';

import { TagCloudService } from './tag-cloud.service';

describe('TagCloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagCloudService]
    });
  });

  it('should be created', inject([TagCloudService], (service: TagCloudService) => {
    expect(service).toBeTruthy();
  }));
});
