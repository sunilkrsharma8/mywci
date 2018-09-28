import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemescalationComponent } from './systemescalation.component';

describe('SystemescalationComponent', () => {
  let component: SystemescalationComponent;
  let fixture: ComponentFixture<SystemescalationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemescalationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemescalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
