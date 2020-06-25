import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkCategoryComponent } from './perk-category.component';

describe('PerkCategoryComponent', () => {
  let component: PerkCategoryComponent;
  let fixture: ComponentFixture<PerkCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerkCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
