import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomtilesComponent } from './customtiles.component';

describe('CustomtilesComponent', () => {
  let component: CustomtilesComponent;
  let fixture: ComponentFixture<CustomtilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomtilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
