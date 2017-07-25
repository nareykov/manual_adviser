import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserProfile} from './user-profile';

@Injectable()
export class UserProfileService {

  constructor(private http: Http) {
  }

  getUserProfile(username: string): Observable<UserProfile> {
    return this.http.get('http://localhost:8080/users/' + username)
      .map((resp: Response) => {
        return resp.json();;
      });
  }

}
