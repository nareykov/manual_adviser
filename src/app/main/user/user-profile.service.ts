import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserProfile} from './user-profile';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserProfileService {

  constructor(private http: Http) {
  }

  getUserProfile(id: number): Observable<UserProfile> {
    return this.http.get('http://localhost:8080/users/' + id)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  postUserProfile(userProfile: UserProfile) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/userprofile/', userProfile, options)
      .subscribe();
  }
}
