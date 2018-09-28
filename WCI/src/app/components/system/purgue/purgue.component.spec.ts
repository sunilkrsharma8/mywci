import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurgueComponent } from './purgue.component';

describe('PurgueComponent', () => {
  let component: PurgueComponent;
  let fixture: ComponentFixture<PurgueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurgueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
