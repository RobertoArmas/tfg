import { TestBed, inject } from '@angular/core/testing';

import { ChildInteractionService } from './child-interaction.service';

describe('ChildInteractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildInteractionService]
    });
  });

  it('should be created', inject([ChildInteractionService], (service: ChildInteractionService) => {
    expect(service).toBeTruthy();
  }));
});
