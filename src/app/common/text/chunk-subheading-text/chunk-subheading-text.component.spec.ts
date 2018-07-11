import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkSubheadingTextComponent } from './chunk-subheading-text.component';

describe('ChunkSubheadingTextComponent', () => {
  let component: ChunkSubheadingTextComponent;
  let fixture: ComponentFixture<ChunkSubheadingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkSubheadingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkSubheadingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
