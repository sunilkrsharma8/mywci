import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrencepatternconfiguratorComponent } from './occurrencepatternconfigurator.component';

describe('OccurrencepatternconfiguratorComponent', () => {
  let component: OccurrencepatternconfiguratorComponent;
  let fixture: ComponentFixture<OccurrencepatternconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurrencepatternconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrencepatternconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
