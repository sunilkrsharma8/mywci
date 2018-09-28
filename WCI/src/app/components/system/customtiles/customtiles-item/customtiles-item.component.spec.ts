import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomtilesItemComponent } from './customtiles-item.component';

describe('CustomtilesItemComponent', () => {
  let component: CustomtilesItemComponent;
  let fixture: ComponentFixture<CustomtilesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomtilesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomtilesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
