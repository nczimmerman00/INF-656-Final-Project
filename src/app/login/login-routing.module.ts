import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/admin-components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

//Routes for login functionailty
const routes: Routes = [
  { path: '/', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
