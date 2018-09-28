import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleconfiguratorComponent } from './titleconfigurator.component';

describe('TitleconfiguratorComponent', () => {
  let component: TitleconfiguratorComponent;
  let fixture: ComponentFixture<TitleconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
