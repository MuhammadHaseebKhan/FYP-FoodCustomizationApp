import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {NoopAnimationsModule, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
// import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import {HttpServiceService} from './services/http-service.service';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { AddNewRestaurantComponent } from './add-new-restaurant/add-new-restaurant.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FoodComponent } from './food/food.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { CategoryWiseFoodComponent } from './category-wise-food/category-wise-food.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';
import { ItemsOfEachFoodComponent } from './items-of-each-food/items-of-each-food.component';
import { AllCategoriesOnlyComponent } from './all-categories-only/all-categories-only.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import { OrderComponent } from './order/order.component';
import { OrdersDeliveredComponent } from './orders-delivered/orders-delivered.component';
// import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';

// registerLocaleData(zh);

// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
// registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    DashboardSidebarComponent,
    DashboardContentComponent,
    AdminprofileComponent,
    AddNewRestaurantComponent,
    RestaurantsListComponent,
    CategoryComponent,
    AddCategoryComponent,
    FoodComponent,
    AddFoodComponent,
    CategoryWiseFoodComponent,
    AddItemComponent,
    ItemComponent,
    ItemsOfEachFoodComponent,
    AllCategoriesOnlyComponent,
    EditCategoryComponent,
    EditRestaurantComponent,
    EditFoodComponent,
    OrderComponent,
    OrdersDeliveredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    // NgZorroAntdModule.forRoot()
    // NgZorroAntdModule
  ],
  providers: [HttpServiceService, ValidateService, FlashMessagesService, AuthService, AuthGuard,
    // { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// { provide: NZ_I18N, useValue: zh_CN }
