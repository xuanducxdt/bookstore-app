import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  isLoggedIn():boolean {
    const token = this.getCookie('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let date: Date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${date.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  getCookie(name: string) {
    let cookies: Array<string> = document.cookie.split(';');
    let cookieName = `${name}=`;
    let cookie: string;

    for (let i: number = 0; i < cookies.length; i += 1) {
        cookie = cookies[i].replace(/^\s+/g, '');
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
}

}
