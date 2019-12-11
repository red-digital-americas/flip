import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageUsersComponent } from './message-users.component';

describe('MessageUsersComponent', () => {
  let component: MessageUsersComponent;
  let fixture: ComponentFixture<MessageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
