import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationexpirationComponent } from './calibrationexpiration.component';

describe('CalibrationexpirationComponent', () => {
  let component: CalibrationexpirationComponent;
  let fixture: ComponentFixture<CalibrationexpirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationexpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationexpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
