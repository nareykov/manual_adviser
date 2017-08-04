import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {Http, Headers} from '@angular/http';
import {AuthConfigConsts, AuthHttp} from 'angular2-jwt';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '5fXbjzff9MIji8SWalrikls0gSCyiTax',
    domain: 'andreyka.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://andreyka.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid profile'
  });
  userProfile: any;
  constructor(public router: Router, public http: Http) {}

  public login() {
    this.auth0.authorize();
  }

  public fun(accessToken = localStorage.getItem('id_token')) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        `http://localhost:8080/login`,
        JSON.stringify({accessToken}),
        {headers}
      ).subscribe();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log(authResult.accessToken);
    console.log(authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.fun();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
