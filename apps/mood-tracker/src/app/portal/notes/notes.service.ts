import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateNoteDto, NoteDocument, UpdateNoteDto } from '@mood-tracker/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient
  ) {}

  submitNote(noteBody: CreateNoteDto): Observable<HttpResponse<NoteDocument>> {
    return this.http.post<NoteDocument>(environment.apiUrl + '/note', noteBody, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      })
    });
  }

  updateNote(noteBody: UpdateNoteDto, id: string): Observable<HttpResponse<NoteDocument>> {
    return this.http.patch<NoteDocument>(environment.apiUrl + '/note/' + id, noteBody, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      })
    });
  }

  getAllNotes(): Observable<HttpResponse<NoteDocument[]>> {
    return this.http.get<NoteDocument[]>(
      environment.apiUrl + '/note',
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        })
      }
    );
  }

  getNoteByDate(date: string): Observable<HttpResponse<NoteDocument>> {
    return this.http.get<NoteDocument>(environment.apiUrl + '/note/' + date, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      })
    })
  }

}
