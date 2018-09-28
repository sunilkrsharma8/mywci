import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentItemComponent } from './instrument-item.component';

describe('InstrumentItemComponent', () => {
  let component: InstrumentItemComponent;
  let fixture: ComponentFixture<InstrumentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
