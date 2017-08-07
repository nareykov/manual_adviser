import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Comment} from '../Models/comment';
import {AuthHttp} from "angular2-jwt";


@Injectable()
export class CommentService {

  constructor(private authHttp: AuthHttp) {
  }

  getCommentsByStepId(stepId: number): Observable<Comment[]> {
    return this.authHttp.get('http://localhost:8080/getCommentsByStepId/' + stepId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  deleteCommentsById(id: number) {
    this.authHttp.post('http://localhost:8080/deleteCommentById', id);
  }

  saveComments(commentDTO: Comment) {
    return this.authHttp.post('http://localhost:8080/saveComment', commentDTO);
  }

  deleteCommentsByStepId(stepId: number) {
    this.authHttp.post('http://localhost:8080/deleteCommentsByStepId', stepId);
  }

}
