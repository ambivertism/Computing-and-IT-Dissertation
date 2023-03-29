import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'mood-tracker-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnDestroy {
  subscriptions = new Subscription();

  signInForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  failureMessage: string | undefined;
  successMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    const formcontent = this.signInForm.value;
    this.subscriptions.add(
      this.service.signIn(formcontent).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Login Successful';
          if (response && response.body) {
            window.localStorage.setItem('accessToken', response.body.accessToken);
            this.route.navigate(['portal']);
          }
        },
        error: () =>
          (this.failureMessage = 'Please check log in details and try again.'),
      })
    );
  }

  // fireTestRequest() {
  //   this.subscriptions.add(
  //     this.service.fireTestRequest().subscribe({
  //       next: () => {
  //           this.successMessage = 'Authorisation complete!'
  //         },
  //       error: (response) => (this.failureMessage = JSON.stringify(response.status) + ' - Unauthorised, please try again.'),
  //     })
  //   );
  // }
}
