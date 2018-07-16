import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewerHomeComponent } from './course-viewer-home.component';

describe('CourseViewerHomeComponent', () => {
  let component: CourseViewerHomeComponent;
  let fixture: ComponentFixture<CourseViewerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseViewerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseViewerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
