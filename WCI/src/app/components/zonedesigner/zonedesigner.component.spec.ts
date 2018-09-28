import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedesignerComponent } from './zonedesigner.component';

describe('ZonedesignerComponent', () => {
  let component: ZonedesignerComponent;
  let fixture: ComponentFixture<ZonedesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonedesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
