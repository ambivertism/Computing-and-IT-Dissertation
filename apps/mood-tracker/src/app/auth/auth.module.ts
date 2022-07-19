import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', component: LandingPageComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-in', component: SignInComponent },
  ]}
];

@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    LandingPageComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  providers: [AuthService],
})
export class AuthModule {}
