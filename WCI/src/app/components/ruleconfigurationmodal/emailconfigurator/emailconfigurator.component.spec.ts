import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailconfiguratorComponent } from './emailconfigurator.component';

describe('EmailconfiguratorComponent', () => {
  let component: EmailconfiguratorComponent;
  let fixture: ComponentFixture<EmailconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
