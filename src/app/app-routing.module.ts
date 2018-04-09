import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
    // { path : '', redirectTo: '/body', pathMatch: 'full'},
    { path : '', redirectTo: '/login', pathMatch: 'full'},
    { path : 'admin-dashboard' , component: AdminDashboardComponent},
    { path : 'login' , component: LoginComponent},
    { path : 'signup' , component: SignUpComponent},
    { path : 'body' , component: BodyComponent},
    { path : 'home' , component: HomeComponent},
    { path : 'home/:id' , component: AboutComponent},
    { path : '**' , component: PageNotFoundComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [BodyComponent, LoginComponent , SignUpComponent, HomeComponent,
     AboutComponent, PageNotFoundComponent]