import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wizard5Component } from './wizard5.component';

describe('Wizard5Component', () => {
  let component: Wizard5Component;
  let fixture: ComponentFixture<Wizard5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wizard5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wizard5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
