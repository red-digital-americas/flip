import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomegeneralComponent } from './homegeneral.component';

describe('HomegeneralComponent', () => {
  let component: HomegeneralComponent;
  let fixture: ComponentFixture<HomegeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomegeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomegeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
