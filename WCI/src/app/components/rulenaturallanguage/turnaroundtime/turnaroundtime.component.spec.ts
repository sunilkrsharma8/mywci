import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnaroundtimeComponent } from './turnaroundtime.component';

describe('TurnaroundtimeComponent', () => {
  let component: TurnaroundtimeComponent;
  let fixture: ComponentFixture<TurnaroundtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnaroundtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnaroundtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
