import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkImageCenteredComponent } from './chunk-image-centered.component';

describe('ChunkImageCenteredComponent', () => {
  let component: ChunkImageCenteredComponent;
  let fixture: ComponentFixture<ChunkImageCenteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkImageCenteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkImageCenteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
