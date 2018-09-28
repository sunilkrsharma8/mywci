import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionOverviewComponent } from './expansion-overview.component';

describe('ExpansionOverviewComponent', () => {
  let component: ExpansionOverviewComponent;
  let fixture: ComponentFixture<ExpansionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
