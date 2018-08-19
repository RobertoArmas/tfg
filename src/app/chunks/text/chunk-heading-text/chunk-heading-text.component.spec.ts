import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkHeadingTextComponent } from './chunk-heading-text.component';

describe('ChunkHeadingTextComponent', () => {
  let component: ChunkHeadingTextComponent;
  let fixture: ComponentFixture<ChunkHeadingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkHeadingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkHeadingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
