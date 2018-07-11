import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkSubheadingComponent } from './chunk-subheading.component';

describe('ChunkSubheadingComponent', () => {
  let component: ChunkSubheadingComponent;
  let fixture: ComponentFixture<ChunkSubheadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkSubheadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkSubheadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
