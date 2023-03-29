import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { ReminderDocument } from '@mood-tracker/api-interfaces';
import { Subscription } from 'rxjs';

import { RemindersService } from '../reminders.service';

@Component({
  selector: 'mood-tracker-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css'],
})
export class ViewAllComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  reminders: ReminderDocument[] = [];

  failureMessage: string | undefined;

  weekDayArray: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  constructor(
    private service: RemindersService,
    private localNotifications: LocalNotifications,
  ) {}

  ngOnInit(): void {
    this.getReminders();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  getDayOfWeek(numbers: number[]) {
    return numbers.map(number => this.weekDayArray[number]);
  }

  getReminders(): void {
    this.subscriptions.add(
      this.service.getAllReminders().subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Response: ', response);
            this.reminders = response.body as ReminderDocument[];
          }
        },
        error: () => (this.failureMessage = 'An error ocurred, sorry.'),
      })
    );
  }

  deleteReminder(reminder: ReminderDocument) {
    if (confirm("Are you sure you want to delete this reminder?")) {
      this.service.deleteReminderById(reminder._id).subscribe({
        next: (response) => {
          console.log('Response 1: ', response);
          if (response.status === 200) {
            console.log('Response: ', response);
            const index = this.reminders.indexOf(reminder);
            this.reminders?.splice(index, 1);
            this.localNotifications.cancel(reminder.ids)
          }
        },
        error: () => (this.failureMessage = 'An error ocurred, sorry.'),
      })
    }
  }
}
