import {Injectable} from '@angular/core';
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
    return this.authHttp.post('http://localhost:8080/setRating/', rating)
      .subscribe();
  }

  getRatingsByUserId(): Observable<Array<Rating>> {
    return this.authHttp.get('http://localhost:8080/getRatingsByUserId/' + localStorage.getItem('userId')).map((resp: Response) => {
      return resp.json();
    });
  }

  getRatingsByUserIdAndAuthorId(authorId: number): Observable<Array<Rating>> {
    return this.authHttp.get('http://localhost:8080/getRatingsByUserIdAndAuthorId/' + localStorage.getItem('userId') + '/' +
      authorId).map((resp: Response) => {
      return resp.json();
    });
  }
}
