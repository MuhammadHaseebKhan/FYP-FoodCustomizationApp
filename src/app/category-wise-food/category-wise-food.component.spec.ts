import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseFoodComponent } from './category-wise-food.component';

describe('CategoryWiseFoodComponent', () => {
  let component: CategoryWiseFoodComponent;
  let fixture: ComponentFixture<CategoryWiseFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
