import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'mood-tracker-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  subscriptions = new Subscription();

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // check if auth token exists and is valid
    // direct to dashboard if valid
    const token = window.localStorage.getItem('accessToken');
    console.log('Token: ', token);
    if (token) {
      this.subscriptions.add(
        this.service.fireTestRequest().subscribe({
          next: () => {
            console.log('Authorization Successful');
            this.router.navigate(['portal']);
          },
          error: () => {
            console.log('Authorization Unsuccessful');
          },
        })
      );
    }
  }

}
