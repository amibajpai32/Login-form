import { provideRouter, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { NgModule } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserTableComponent } from './user-table/user-table.component';
import { authGuard } from './auth.guard';
import { NewuserComponent } from './newuser/newuser.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'loginpage',
        pathMatch: 'full'

    },

    {
        path: 'user-table',
        component: UserTableComponent,
        canActivate:[authGuard]
    },
    {

    
        path: 'dashboard',
        component: DashboardComponent
    },

    
    {
        path:'loginpage',
        component: LoginpageComponent
    },

    {
        path:'registrationpage',
        component: RegistrationpageComponent,
       
        
    },

    {
        path:'newuser',
        component: NewuserComponent,
       
        
    }
    
   
];



