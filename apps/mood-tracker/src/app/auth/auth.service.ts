import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto, SignInDto, SignInResponseDto, UserResponseDto } from '@mood-tracker/api-interfaces';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(userBody: CreateUserDto): Observable<HttpResponse<UserResponseDto>> {
    return this.http.post<UserResponseDto>(environment.apiUrl + '/auth/signup', userBody, {
      observe: 'response',
    });
  }

  signIn(userBody: SignInDto): Observable<HttpResponse<SignInResponseDto>> {
    return this.http.post<SignInResponseDto>(
      environment.apiUrl + '/auth/signin',
      userBody,
      {observe: 'response'}
    );
  }

  fireTestRequest() {
    return this.http.post(environment.apiUrl + '/auth/test', '', {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      }),
    });
  }
}
