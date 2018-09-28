import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentinventorylevelComponent } from './reagentinventorylevel.component';

describe('ReagentinventorylevelComponent', () => {
  let component: ReagentinventorylevelComponent;
  let fixture: ComponentFixture<ReagentinventorylevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentinventorylevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentinventorylevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
