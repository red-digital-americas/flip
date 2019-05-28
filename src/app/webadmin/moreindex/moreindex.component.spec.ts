import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreindexComponent } from './moreindex.component';

describe('MoreindexComponent', () => {
  let component: MoreindexComponent;
  let fixture: ComponentFixture<MoreindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
