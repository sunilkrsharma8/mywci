import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentauditlogComponent } from './recentauditlog.component';

describe('RecentauditlogComponent', () => {
  let component: RecentauditlogComponent;
  let fixture: ComponentFixture<RecentauditlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentauditlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentauditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
