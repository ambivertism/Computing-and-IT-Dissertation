import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReminderDto, ReminderDocument, UpdateReminderDto } from '@mood-tracker/api-interfaces';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemindersService {
  constructor(private http: HttpClient) {}

  createReminder(
    reminderBody: CreateReminderDto
  ): Observable<HttpResponse<ReminderDocument>> {
    return this.http.post<ReminderDocument>(
      environment.apiUrl + '/reminders',
      reminderBody,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        }),
      }
    );
  }
  updateReminder(
    reminderBody: UpdateReminderDto,
    id: string
  ): Observable<HttpResponse<ReminderDocument>> {
    return this.http.put<ReminderDocument>(
      environment.apiUrl + '/reminders/' + id,
      reminderBody,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        }),
      }
    );
  }
  getAllReminders(): Observable<HttpResponse<ReminderDocument[]>> {
    return this.http.get<ReminderDocument[]>(
      environment.apiUrl + '/reminders',
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        }),
      }
    );
  }
  getReminderById(id: string): Observable<HttpResponse<ReminderDocument>> {
    return this.http.get<ReminderDocument>(
      environment.apiUrl + '/reminders/' + id,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        }),
      }
    );
  }
  deleteReminderById(id: string): Observable<HttpResponse<ReminderDocument>> {
    return this.http.delete<ReminderDocument>(
      environment.apiUrl + '/reminders/' + id,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        }),
      }
    );
  }
}
