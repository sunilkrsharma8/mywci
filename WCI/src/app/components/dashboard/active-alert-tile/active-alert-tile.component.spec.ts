import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAlertTileComponent } from './active-alert-tile.component';

describe('ActiveAlertTileComponent', () => {
  let component: ActiveAlertTileComponent;
  let fixture: ComponentFixture<ActiveAlertTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAlertTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAlertTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
