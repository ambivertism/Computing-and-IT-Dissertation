import { Component } from '@angular/core';

@Component({
  selector: 'mood-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  createReminder() {
    window['cordova'].plugins.notification.local.schedule({
      title: 'First notification!',
      text: 'kinda easy...',
      foreground: true,
      trigger: { in: 1, unit: 'minute' },
    });
  }
}
