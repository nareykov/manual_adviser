import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../Models/user';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor( public authHttp: AuthHttp) {
  }

  getUserArray(): Observable<User[]> {
    return this.authHttp.get('http://localhost:8080/users/')
      .map((resp: Response) => {
        return resp.json();
      });
  }
}
