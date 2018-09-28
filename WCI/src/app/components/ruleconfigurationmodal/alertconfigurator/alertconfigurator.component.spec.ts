import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertconfiguratorComponent } from './alertconfigurator.component';

describe('AlertconfiguratorComponent', () => {
  let component: AlertconfiguratorComponent;
  let fixture: ComponentFixture<AlertconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
