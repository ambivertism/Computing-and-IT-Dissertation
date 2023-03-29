import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { CreateReminderDto, Reminder, UpdateReminderDto } from '@mood-tracker/api-interfaces';
import { Observable, Subscription } from 'rxjs';
import { PortalService } from '../../portal.service';
import { RemindersService } from '../reminders.service';

@Component({
  selector: 'mood-tracker-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  subscriptions = new Subscription();

  id: string | undefined;

  failureMessage: string | undefined;

  isUpdate = false;
  reminderToUpdate: Reminder | undefined;

  reminderForm = this.formBuilder.group({
    title: '',
    text: '',
    time: '',
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private localNotifications: LocalNotifications,
    private reminderService: RemindersService,
    private portalService: PortalService
  ) {}

  ngOnInit(): void {
    this.isUpdate = this.router.url.includes('update');
    if(this.isUpdate) {
      this.id = this.route.snapshot.paramMap.get('id') as string;
      this.getReminderById(this.id);
    }
  }

  getReminderById(id: string) {
    this.subscriptions.add(
      this.reminderService.getReminderById(id).subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Response: ', response);
            this.reminderToUpdate = response.body as Reminder;
            this.populateUpdateForm(this.reminderToUpdate);
          }
        },
        error: () => (this.failureMessage = 'An error ocurred, sorry.'),
      })
    );
  }

  populateUpdateForm(reminder: Reminder) {
    this.reminderForm.controls['title'].setValue(reminder.title);
    this.reminderForm.controls['text'].setValue(reminder.text);
    this.reminderForm.controls['time'].setValue(reminder.time);
    reminder.days.forEach(day => this.reminderForm.controls[day].setValue(true));
  }

  showReminders() {
    this.localNotifications.getAll().then((notifications: any[]) => {
      const formatNotif: any[] = [];
      for (const notification of notifications) {
        const returnObject = {
          title: notification.title,
          text: notification.text,
          time: new Date(notification.trigger.at)
        }
        formatNotif.push(returnObject);
      }
      alert(JSON.stringify(formatNotif, null, 2));
      alert(notifications.length + ": notifications set.");
    });
  }

  cancelReminder() {
    this.localNotifications.cancelAll();
    alert('Notifications cancelled');
  }

  boxChecked(): boolean {
    // check if any days are selected & remove error message if so.
    console.log('box checked called')
    const formContent = Object.keys(this.reminderForm.value).map(day => this.reminderForm.value[day]);
    console.log(formContent)
    if (formContent.some(day => day === true)) {
      this.failureMessage = undefined;
      return true;
    } else {
      this.failureMessage = 'Please select a day to set reminder.'
      return false;
    }
  }

  onSubmit(): void {
    // Get form data
    const formContent = this.reminderForm.value;
    console.log('formContent', formContent);
    
    const title = formContent.title;
    const text = formContent.text;
    const time = formContent.time;

    if ([title, text, time].some(v => v === '')) {
      alert('Please enter all fields.')
      return;
    }

    if (!this.boxChecked()) {
      return;
    }
    
    const keys = Object.keys(this.reminderForm.value);
    const days = keys.filter(key => this.reminderForm.value[key] === true).map(key => Number(key));
    
    const remindersToCancel = this.isUpdate ? this.reminderToUpdate?.ids : [];
    const ids = this.portalService.createReminder(title, text, time, days, remindersToCancel);
    const reminderDto = { title, text, time, ids, days };
    console.log('reminderDto', reminderDto)

    this.subscriptions.add(
      this.getRequest(reminderDto).subscribe({
        next: (response) => {
          if (response.status === 201 || response.status === 200) {
            console.log('Response: ', response);
            this.router.navigate(['portal', 'reminders']);
          }
        },
        error: () => (this.failureMessage = 'An error ocurred, sorry.')
      })
    );
  }

  getRequest(reminderDto: CreateReminderDto | UpdateReminderDto):  Observable<HttpResponse<Reminder>> {
    if (this.isUpdate) {
      return this.reminderService.updateReminder(reminderDto, this.id as string)
    } else {
      return this.reminderService.createReminder(reminderDto)
    }
  }
}
