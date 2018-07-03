import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { AuthGuard} from './guard/auth.guard';
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
const routes: Routes = [
    // { path : '', redirectTo: '/body', pathMatch: 'full'},
    { path : '', redirectTo: '/login', pathMatch: 'full'},
    {
        path : 'admin-dashboard',
        canActivate : [AuthGuard],
        component: AdminDashboardComponent,
        children: [
            { path: 'adminprofile', component: AdminprofileComponent },
            { path: 'dashboardcontent', component: DashboardContentComponent },
            { path: 'newrestaurant', component: AddNewRestaurantComponent },
            { path: 'restaurantslist', component: RestaurantsListComponent },
            { path: 'about', component: AboutComponent },
            { path: 'home', component: HomeComponent },
            { path : 'signup' , component: SignUpComponent},
            { path : 'category' , component: CategoryComponent,
                children: [
                ]

            },
            { path : 'addcategory' , component: AddCategoryComponent},
            { path : 'food' , component: FoodComponent},
            { path : 'addfood' , component: AddFoodComponent},
            { path : 'categorywisefood/:cid' , component: CategoryWiseFoodComponent},
            { path : 'items/:cid' , component: ItemComponent},
            { path : 'additem' , component: AddItemComponent},
            { path : 'itemsofeachfood' , component: ItemsOfEachFoodComponent},
            { path : 'allcategories' , component: AllCategoriesOnlyComponent},
        ]
        },
    // { path : 'adminprofile' , component: AdminprofileComponent},
    { path : 'login' , component: LoginComponent},
    { path : 'signup' , component: SignUpComponent},
    // { path : 'body' , component: BodyComponent},
    // { path : 'home' , component: HomeComponent},
    // { path : 'home/:id' , component: AboutComponent},
    { path : '**' , component: PageNotFoundComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [BodyComponent, LoginComponent , SignUpComponent, HomeComponent,
     AboutComponent, PageNotFoundComponent, AdminprofileComponent, DashboardContentComponent, RestaurantsListComponent, CategoryComponent,
     AddCategoryComponent];
