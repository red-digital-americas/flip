import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenantPayComponent } from './add-tenant-pay.component';

describe('AddTenantPayComponent', () => {
  let component: AddTenantPayComponent;
  let fixture: ComponentFixture<AddTenantPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTenantPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenantPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
