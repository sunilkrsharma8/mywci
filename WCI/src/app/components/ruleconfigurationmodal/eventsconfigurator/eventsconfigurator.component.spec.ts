import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsconfiguratorComponent } from './eventsconfigurator.component';

describe('EventsconfiguratorComponent', () => {
  let component: EventsconfiguratorComponent;
  let fixture: ComponentFixture<EventsconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
