import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wizard2bComponent } from './wizard2b.component';

describe('Wizard2bComponent', () => {
  let component: Wizard2bComponent;
  let fixture: ComponentFixture<Wizard2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wizard2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wizard2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
