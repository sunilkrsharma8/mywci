import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdefinedComponent } from './userdefined.component';

describe('UserdefinedComponent', () => {
  let component: UserdefinedComponent;
  let fixture: ComponentFixture<UserdefinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdefinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
