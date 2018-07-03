import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOfEachFoodComponent } from './items-of-each-food.component';

describe('ItemsOfEachFoodComponent', () => {
  let component: ItemsOfEachFoodComponent;
  let fixture: ComponentFixture<ItemsOfEachFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsOfEachFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsOfEachFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
