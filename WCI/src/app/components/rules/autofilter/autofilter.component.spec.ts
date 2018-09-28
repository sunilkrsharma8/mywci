import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofilterComponent } from './autofilter.component';

describe('AutofilterComponent', () => {
  let component: AutofilterComponent;
  let fixture: ComponentFixture<AutofilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutofilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutofilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
