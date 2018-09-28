import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentmapComponent } from './instrumentmap.component';

describe('InstrumentmapComponent', () => {
  let component: InstrumentmapComponent;
  let fixture: ComponentFixture<InstrumentmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
