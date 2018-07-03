import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoriesOnlyComponent } from './all-categories-only.component';

describe('AllCategoriesOnlyComponent', () => {
  let component: AllCategoriesOnlyComponent;
  let fixture: ComponentFixture<AllCategoriesOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCategoriesOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoriesOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
