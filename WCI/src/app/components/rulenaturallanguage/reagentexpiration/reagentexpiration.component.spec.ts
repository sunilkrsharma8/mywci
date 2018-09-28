import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentexpirationComponent } from './reagentexpiration.component';

describe('ReagentexpirationComponent', () => {
  let component: ReagentexpirationComponent;
  let fixture: ComponentFixture<ReagentexpirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentexpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentexpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
