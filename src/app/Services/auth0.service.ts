import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthConfigConsts, AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {User} from '../Models/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Auth0Service {

  user: User;

  auth0 = new auth0.WebAuth({
    clientID: '5fXbjzff9MIji8SWalrikls0gSCyiTax',
    domain: 'andreyka.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://andreyka.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid profile'
  });
  userProfile: any;
  constructor(public router: Router, private authHttp: AuthHttp, public http: Http) {}

  public login() {
    this.auth0.authorize();
  }

  public getUserInfo(accessToken = localStorage.getItem('id_token')): Observable<User> {
    localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, accessToken);
    return this.authHttp.get('http://localhost:8080/me/').map(resp => resp.json());
  }

  public setUserInfo() {
    this.getUserInfo().subscribe((user) =>  {
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userImage', user.image);
      localStorage.setItem('userName', user.username);
    });
    console.log(localStorage.getItem('userId'));
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
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.setUserInfo();
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
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
