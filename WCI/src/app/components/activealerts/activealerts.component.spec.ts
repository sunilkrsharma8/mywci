import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivealertsComponent } from './activealerts.component';

describe('ActivealertsComponent', () => {
  let component: ActivealertsComponent;
  let fixture: ComponentFixture<ActivealertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivealertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivealertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
