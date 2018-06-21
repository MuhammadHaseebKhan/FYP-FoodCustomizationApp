import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
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
    FlashMessagesModule
  ],
  providers: [HttpServiceService, ValidateService, FlashMessagesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
