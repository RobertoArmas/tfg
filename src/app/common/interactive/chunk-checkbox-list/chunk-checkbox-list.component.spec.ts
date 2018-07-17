import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkCheckboxListComponent } from './chunk-checkbox-list.component';

describe('ChunkCheckboxListComponent', () => {
  let component: ChunkCheckboxListComponent;
  let fixture: ComponentFixture<ChunkCheckboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkCheckboxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
