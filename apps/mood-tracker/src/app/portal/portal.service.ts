import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocalNotification, LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { ReminderDocument } from '@mood-tracker/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  
  constructor(private localNotifications: LocalNotifications, private http: HttpClient) {}

  getAllReminders(): Observable<HttpResponse<ReminderDocument[]>> {
    return this.http.get<ReminderDocument[]>(environment.apiUrl + '/reminders', {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      }),
    });
  }
  
  createReminder(title: string, text: string, time: string, days: number[], remindersToCancel: number[] = []): number[] {
    // Convert time inputs to numbers
    const triggerTime = time.split(':');
    const hours = parseInt(triggerTime[0]);
    const minutes = parseInt(triggerTime[1]);

    const scheduleArray: ILocalNotification[] = [];
    const returnIdArray: number[] = []

    for (let i = 0; scheduleArray.length < 10; ++i) {
      const desiredTime = new Date();

      desiredTime.setHours(hours);
      desiredTime.setMinutes(minutes);
      desiredTime.setSeconds(0);
      desiredTime.setDate(desiredTime.getDate() + i);

      // Skip this iteration of the loop if the day is not selected
      if (!days.includes(desiredTime.getDay())) {
        continue;
      }
      console.log(desiredTime)

      // generate ids
      const id =  Math.floor(Math.random() * Date.now()) + i;
      // push ids to array for use in dto
      returnIdArray.push(id);
      
      const scheduleObject: ILocalNotification = {
        id,
        title,
        text: text,
        foreground: true,
        trigger: {
          at: desiredTime,
        }
      };

      scheduleArray.push(scheduleObject);
    }
    if (remindersToCancel.length) {
      this.localNotifications.cancel(remindersToCancel);
    }
    try {
      this.localNotifications.schedule(scheduleArray);
    } catch (error) {
      console.log(error);
    }
    return returnIdArray;
  }

  
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
