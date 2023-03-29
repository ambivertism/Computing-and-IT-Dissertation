import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReminderDocument } from '@mood-tracker/api-interfaces';
import { Subscription } from 'rxjs';
import { PortalService } from './portal.service';

@Component({
  selector: 'mood-tracker-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  constructor(private service: PortalService) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.service.getAllReminders().subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Response: ', response);
            const reminders = response.body as ReminderDocument[];
            for (const reminder of reminders) {
              const {title, text, time, days, ids} = reminder;
              this.service.createReminder(title, text, time, days, ids)
            }
          }
        },
        error: (error) => console.log(error),
      })
    );
  }

}
