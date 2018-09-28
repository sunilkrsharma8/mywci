import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedruleparamsComponent } from './sharedruleparams.component';

describe('SharedruleparamsComponent', () => {
  let component: SharedruleparamsComponent;
  let fixture: ComponentFixture<SharedruleparamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedruleparamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedruleparamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
