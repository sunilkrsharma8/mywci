import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityconfiguratorComponent } from './severityconfigurator.component';

describe('SeverityconfiguratorComponent', () => {
  let component: SeverityconfiguratorComponent;
  let fixture: ComponentFixture<SeverityconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeverityconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeverityconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
