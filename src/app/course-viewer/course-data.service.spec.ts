import { TestBed, inject } from '@angular/core/testing';

import { CourseDataService } from './course-data.service';

describe('CourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseDataService]
    });
  });

  it('should be created', inject([CourseDataService], (service: CourseDataService) => {
    expect(service).toBeTruthy();
  }));
});
