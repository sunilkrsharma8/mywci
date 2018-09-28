import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritysamplesComponent } from './prioritysamples.component';

describe('PrioritysamplesComponent', () => {
  let component: PrioritysamplesComponent;
  let fixture: ComponentFixture<PrioritysamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritysamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritysamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
