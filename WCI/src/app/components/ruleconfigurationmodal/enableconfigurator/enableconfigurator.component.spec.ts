import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableconfiguratorComponent } from './enableconfigurator.component';

describe('EnableconfiguratorComponent', () => {
  let component: EnableconfiguratorComponent;
  let fixture: ComponentFixture<EnableconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
