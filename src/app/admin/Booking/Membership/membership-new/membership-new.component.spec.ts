import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipNewComponent } from './membership-new.component';

describe('MembershipNewComponent', () => {
  let component: MembershipNewComponent;
  let fixture: ComponentFixture<MembershipNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
