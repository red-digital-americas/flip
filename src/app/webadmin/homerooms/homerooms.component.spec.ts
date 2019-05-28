import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeroomsComponent } from './homerooms.component';

describe('HomeroomsComponent', () => {
  let component: HomeroomsComponent;
  let fixture: ComponentFixture<HomeroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
