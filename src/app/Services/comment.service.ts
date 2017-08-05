import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Comment} from '../Models/comment';


@Injectable()
export class CommentService {

  constructor(private http: Http) {
  }

  getCommentsByStepId(stepId: number): Observable<Array<Comment>> {
    return this.http.get('http://localhost:8080/getCommentsByStepId/' + stepId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  deleteCommentsById(id: number) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.post('http://localhost:8080/deleteCommentById', id, options);
  }

  saveComments(commentDTO: Comment) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.post('http://localhost:8080/saveComment', commentDTO, options);
  }

  deleteCommentsByStepId(stepId: number) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.post('http://localhost:8080/deleteCommentsByStepId', stepId, options);
  }

}
