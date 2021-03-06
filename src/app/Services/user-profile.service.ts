import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserProfile} from '../Models/user-profile';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class UserProfileService {

  constructor(private authHttp: AuthHttp) {
  }

  getUserProfile(id: number): Observable<UserProfile> {
    return this.authHttp.get('http://localhost:8080/users/' + id)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  postUserProfile(userProfile: UserProfile) {
    return this.authHttp.post('http://localhost:8080/userprofile/', userProfile)
      .subscribe();
  }
}
