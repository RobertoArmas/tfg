import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkTextComponent } from './chunk-text.component';

describe('ChunkTextComponent', () => {
  let component: ChunkTextComponent;
  let fixture: ComponentFixture<ChunkTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
