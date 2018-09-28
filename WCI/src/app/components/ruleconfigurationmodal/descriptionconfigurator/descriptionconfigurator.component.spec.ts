import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionconfiguratorComponent } from './descriptionconfigurator.component';

describe('DescriptionconfiguratorComponent', () => {
  let component: DescriptionconfiguratorComponent;
  let fixture: ComponentFixture<DescriptionconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
