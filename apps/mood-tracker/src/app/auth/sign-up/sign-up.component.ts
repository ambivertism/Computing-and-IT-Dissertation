import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'mood-tracker-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnDestroy {
  subscriptions = new Subscription();

  signUpForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
  });

  failureMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    const formcontent = this.signUpForm.value;
    this.subscriptions.add(
      this.service.signUp(formcontent).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 201) {
            this.route.navigate(['/auth/sign-in']);
          }
        },
        error: () =>
          (this.failureMessage = 'Something was wrong, sorry. Try again?'),
      })
    );
  }
}
