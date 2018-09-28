import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsamplesComponent } from './systemsamples.component';

describe('SystemsamplesComponent', () => {
  let component: SystemsamplesComponent;
  let fixture: ComponentFixture<SystemsamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
