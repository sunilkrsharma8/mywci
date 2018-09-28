import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalrulesettingsconfiguratorComponent } from './globalrulesettingsconfigurator.component';

describe('GlobalrulesettingsconfiguratorComponent', () => {
  let component: GlobalrulesettingsconfiguratorComponent;
  let fixture: ComponentFixture<GlobalrulesettingsconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalrulesettingsconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalrulesettingsconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
