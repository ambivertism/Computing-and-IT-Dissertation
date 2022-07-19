import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ILocalNotification, LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Component({
  selector: 'mood-tracker-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  isUpdate = false;

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
    private router: Router,
    private formBuilder: FormBuilder,
    private localNotifications: LocalNotifications
  ) {}

  ngOnInit(): void {
    this.isUpdate = this.router.url.includes('update');
  }

  createReminder() {
    // Get form data
    const formContent = this.reminderForm.value;
    console.log(formContent);
  
    const title = formContent.title;
    const text = formContent.text;

    // Convert time inputs to numbers
    const time = formContent.time;
    const triggerTime = time.split(':');
    const hours = parseInt(triggerTime[0]);
    const minutes = parseInt(triggerTime[1]);

    const scheduleArray: ILocalNotification[] = [];
    // > add < \\
    // num input for number of days to schedule alarms
    // assign to conditional below.

    // Schedule using 'at'
    for (let i = 0; i < 10; ++i) {
      const desiredTime = new Date();

      desiredTime.setHours(hours);
      desiredTime.setMinutes(minutes);
      desiredTime.setSeconds(0);
      desiredTime.setDate(desiredTime.getDate() + i);

      if (!formContent[desiredTime.getDay()]) {
        continue;
      }
      
      const scheduleObject: ILocalNotification = {
        id: Math.floor(Math.random() * Date.now()) + i,
        title,
        text: text + ' (At)',
        foreground: true,
        trigger: {
          at: desiredTime,
        }
      };
      scheduleArray.push(scheduleObject);
    }

    // Schedule using 'every'
    // for (let i = 0; i < 7; ++i) {
    //   if (!formContent[i]) {
    //     continue;
    //   }
    //   const weekday = i === 0 ? 7 : i;
    //   const scheduleViaEvery = {
    //     id: Math.floor(Math.random() * Date.now()) + 1,
    //     title,
    //     text: text + ' (Every)',
    //     foreground: true,
    //     trigger: {
    //       every: {
    //         weekday,
    //         hour: hours,
    //         minute: minutes,
    //         second: 0
    //       }
    //     },
    //   } as ILocalNotification;
  
    //   scheduleArray.push(scheduleViaEvery);
    // }

    this.localNotifications.schedule(scheduleArray);
  }

  showReminders() {
    this.localNotifications.getAll().then((notifications) => {
      alert(JSON.stringify(notifications));
      alert(notifications.length);
    });
  }

  cancelReminder() {
    this.localNotifications.cancelAll();
  }

  // onSubmit(): void {
  //   const formcontent = this.reminderForm.value;
  //   console.log(formcontent);
  //   this.createReminder(formcontent.title, formcontent.text, formcontent.time);
  // }

  // createReminder(title: string, text: string, time: string) {
  //   try {
  //     const triggerTime = time.split(':');
  //     // This was a test to prove the plugin worked
  //     window['cordova'].plugins.notification.local.schedule({
  //       title: 'First notification!',
  //       text: 'kinda easy...',
  //       foreground: true,
  //       trigger: { in: 1, unit: 'minute' },
  //     });

  //     // This was how the plugin claimed to work but has not been maintained in a long time
  //     window['cordova'].plugins.notification.local.schedule({
  //       id:5,
  //       title,
  //       text,
  //       foreground: true,
  //       smallIcon: 'res://ic_popup_reminder',
  //       trigger: { every: { hour: parseInt(triggerTime[0]), minute: parseInt(triggerTime[1]), second: 0 } },
  //     })
  //   } catch (e) {
  //     alert('error');
  //     console.log(e);
  //   }
  // }
}
