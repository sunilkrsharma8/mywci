import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CannedcommentItemComponent } from './cannedcomment-item.component';

describe('CannedcommentItemComponent', () => {
  let component: CannedcommentItemComponent;
  let fixture: ComponentFixture<CannedcommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CannedcommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CannedcommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
