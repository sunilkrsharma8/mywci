import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIntegrationItemComponent } from './manage-integration-item.component';

describe('ManageIntegrationItemComponent', () => {
  let component: ManageIntegrationItemComponent;
  let fixture: ComponentFixture<ManageIntegrationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIntegrationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIntegrationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
