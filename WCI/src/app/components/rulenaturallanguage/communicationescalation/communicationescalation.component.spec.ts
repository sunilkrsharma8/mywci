import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationescalationComponent } from './communicationescalation.component';

describe('CommunicationescalationComponent', () => {
  let component: CommunicationescalationComponent;
  let fixture: ComponentFixture<CommunicationescalationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationescalationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationescalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
