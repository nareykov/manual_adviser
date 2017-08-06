import { Injectable } from '@angular/core';
import {Rating} from '../Models/rating';
import {Http, RequestOptions} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class RatingService {
  constructor(private http: Http, private authHttp: AuthHttp) {
  }


  saveRating(rating: Rating) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    const options = new RequestOptions({ headers: headers });
    return this.authHttp.post('http://localhost:8080/setRating/', rating, options)
      .subscribe();
  }
}
