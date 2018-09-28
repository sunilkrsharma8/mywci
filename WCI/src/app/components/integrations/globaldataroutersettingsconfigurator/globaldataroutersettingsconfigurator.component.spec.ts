import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaldataroutersettingsconfiguratorComponent } from './globaldataroutersettingsconfigurator.component';

describe('GlobaldataroutersettingsconfiguratorComponent', () => {
  let component: GlobaldataroutersettingsconfiguratorComponent;
  let fixture: ComponentFixture<GlobaldataroutersettingsconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobaldataroutersettingsconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobaldataroutersettingsconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
