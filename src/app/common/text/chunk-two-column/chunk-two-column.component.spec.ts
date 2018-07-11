import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkTwoColumnComponent } from './chunk-two-column.component';

describe('ChunkTwoColumnComponent', () => {
  let component: ChunkTwoColumnComponent;
  let fixture: ComponentFixture<ChunkTwoColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkTwoColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkTwoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
