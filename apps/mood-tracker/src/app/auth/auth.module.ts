import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: AuthComponent },
];

@NgModule({
  declarations: [AuthComponent, SignUpComponent, SignInComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  providers: [AuthService],
})
export class AuthModule {}
