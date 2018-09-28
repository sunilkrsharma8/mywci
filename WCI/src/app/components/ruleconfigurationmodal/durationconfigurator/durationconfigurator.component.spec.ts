import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationconfiguratorComponent } from './durationconfigurator.component';

describe('DurationconfiguratorComponent', () => {
  let component: DurationconfiguratorComponent;
  let fixture: ComponentFixture<DurationconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
