import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignindexComponent } from './designindex.component';

describe('DesignindexComponent', () => {
  let component: DesignindexComponent;
  let fixture: ComponentFixture<DesignindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
