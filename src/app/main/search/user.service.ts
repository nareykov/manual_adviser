import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }
  getUserArray(): Observable<User[]> {
    return this.http.get('http://localhost:8080/users')
      .map((resp: Response) => {

        const userList = resp.json();
        const users: User[] = [];
        for (const index in userList) {
          console.log(userList[index]);
          const user = userList[index];
          users.push({username: user.username, image: user.image, commentAmount: user.commentAmount, manualAmount: user.manualAmount});
        }
        return users;
      });
  }

}
