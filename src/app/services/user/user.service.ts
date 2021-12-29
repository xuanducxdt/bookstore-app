import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/components/login/login.component';
import { GlobalConstants } from 'src/app/common/global.constants';
import { ICommonResponse } from '../book/book.service';

export interface ISignInResponse {
  message: string;
  data: IUser
}

export interface ISignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiUrl: string = `${GlobalConstants.apiUrl}/api/user`

  constructor(private http: HttpClient) { }

  signIn(user: IUser): Observable<ISignInResponse> {
    return this.http.post<ISignInResponse>(`${this.userApiUrl}/login`, user)
  }

  signUp(signUpData: ISignUpData): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.userApiUrl, signUpData)
  }
}
