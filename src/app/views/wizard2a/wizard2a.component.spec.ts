import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wizard2aComponent } from './wizard2a.component';

describe('Wizard2aComponent', () => {
  let component: Wizard2aComponent;
  let fixture: ComponentFixture<Wizard2aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wizard2aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wizard2aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
