import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeconfiguratorComponent } from './datetimeconfigurator.component';

describe('DatetimeconfiguratorComponent', () => {
  let component: DatetimeconfiguratorComponent;
  let fixture: ComponentFixture<DatetimeconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimeconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
