import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumenteventComponent } from './instrumentevent.component';

describe('InstrumenteventComponent', () => {
  let component: InstrumenteventComponent;
  let fixture: ComponentFixture<InstrumenteventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumenteventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumenteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
