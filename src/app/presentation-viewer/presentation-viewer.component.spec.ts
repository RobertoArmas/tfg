import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationViewerComponent } from './presentation-viewer.component';

describe('PresentationViewerComponent', () => {
  let component: PresentationViewerComponent;
  let fixture: ComponentFixture<PresentationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
