import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkHeadingComponent } from './chunk-heading.component';

describe('ChunkHeadingComponent', () => {
  let component: ChunkHeadingComponent;
  let fixture: ComponentFixture<ChunkHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
