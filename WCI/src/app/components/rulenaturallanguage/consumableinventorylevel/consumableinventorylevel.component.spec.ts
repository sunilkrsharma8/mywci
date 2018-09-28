import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumableinventorylevelComponent } from './consumableinventorylevel.component';

describe('ConsumableinventorylevelComponent', () => {
  let component: ConsumableinventorylevelComponent;
  let fixture: ComponentFixture<ConsumableinventorylevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumableinventorylevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumableinventorylevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
