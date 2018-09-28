import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CannedcommentsComponent } from './cannedcomments.component';

describe('CannedcommentsComponent', () => {
  let component: CannedcommentsComponent;
  let fixture: ComponentFixture<CannedcommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CannedcommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CannedcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
