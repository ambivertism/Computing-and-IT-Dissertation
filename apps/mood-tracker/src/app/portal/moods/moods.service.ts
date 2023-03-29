import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMoodDto, MoodDocument, UpdateMoodDto } from '@mood-tracker/api-interfaces';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {

  constructor(private http: HttpClient) {}

  getMoodByDate(date: string): Observable<HttpResponse<MoodDocument>> {
    return this.http.get<MoodDocument>(environment.apiUrl + '/mood/' + date, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      })
    });
  }

  getMoods(): Observable<HttpResponse<MoodDocument[]>> {
    return this.http.get<MoodDocument[]>(
      environment.apiUrl + '/mood',
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        })
      }
    );
  }

  submitMood(moodBody: CreateMoodDto): Observable<HttpResponse<MoodDocument>> {
    return this.http.post<MoodDocument>(environment.apiUrl + '/mood', moodBody, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      })
    });
  }

  updateMood(moodBody: UpdateMoodDto, id: string): Observable<HttpResponse<MoodDocument>> {
    return this.http.patch<MoodDocument>(environment.apiUrl + '/mood/' + id, moodBody, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      })
    });
  }
}
