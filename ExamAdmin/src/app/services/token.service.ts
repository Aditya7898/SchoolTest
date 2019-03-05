import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token) {
    this.cookieService.set('Auth', token);
  }

  getToken() {
    return this.cookieService.get('Auth')
  }

  deleteToken() {
    this.cookieService.delete('Auth');
  }

  getPayLoad() {
    const token = this.getToken();
    if (token) {
      let payload;
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
      return payload.data;
    }
    else {
      return null;
    }
  }
}
