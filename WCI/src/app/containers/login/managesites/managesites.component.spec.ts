import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesitesComponent } from './managesites.component';

describe('ManagesitesComponent', () => {
  let component: ManagesitesComponent;
  let fixture: ComponentFixture<ManagesitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
