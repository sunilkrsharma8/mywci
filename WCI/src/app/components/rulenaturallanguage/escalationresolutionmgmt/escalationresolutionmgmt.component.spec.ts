import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationresolutionmgmtComponent } from './escalationresolutionmgmt.component';

describe('EscalationresolutionmgmtComponent', () => {
  let component: EscalationresolutionmgmtComponent;
  let fixture: ComponentFixture<EscalationresolutionmgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalationresolutionmgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationresolutionmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
