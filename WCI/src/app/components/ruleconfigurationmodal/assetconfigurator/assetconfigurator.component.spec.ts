import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetconfiguratorComponent } from './assetconfigurator.component';

describe('AssetconfiguratorComponent', () => {
  let component: AssetconfiguratorComponent;
  let fixture: ComponentFixture<AssetconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
