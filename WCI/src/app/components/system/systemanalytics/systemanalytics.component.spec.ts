import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemanalyticsComponent } from './systemanalytics.component';

describe('SystemanalyticsComponent', () => {
  let component: SystemanalyticsComponent;
  let fixture: ComponentFixture<SystemanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
