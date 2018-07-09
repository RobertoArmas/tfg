import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTabsComponent } from './review-tabs.component';

describe('ReviewTabsComponent', () => {
  let component: ReviewTabsComponent;
  let fixture: ComponentFixture<ReviewTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
