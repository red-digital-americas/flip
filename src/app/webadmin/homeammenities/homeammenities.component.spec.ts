import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeammenitiesComponent } from './homeammenities.component';

describe('HomeammenitiesComponent', () => {
  let component: HomeammenitiesComponent;
  let fixture: ComponentFixture<HomeammenitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeammenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeammenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
