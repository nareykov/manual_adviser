import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Manual} from '../Models/manual';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from '@angular/router';
import {Tag} from '../Models/tag';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ManualService {

  constructor(private router: Router, private authHttp: AuthHttp, private http: Http) {
  }

  getManual(manualId: number): Observable<Manual> {
    return this.authHttp.get('http://localhost:8080/manual/' + manualId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  searchManuals(searchparam: string, offset: number): Observable<Manual[]> {
    return this.authHttp.get('http://localhost:8080/manuals/' + searchparam + '/' + offset)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  getNewManuals(lastId: number): Observable<Manual[]> {
    return this.authHttp.get('http://localhost:8080/newManuals/' + lastId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  getPopularManuals(): Observable<Manual[]> {
    return this.http.get('http://localhost:8080/popularManuals/')
      .map((resp: Response) => {
        return resp.json();
      });
  }

  searchManualsByTag(searchparam: string, offset: number): Observable<Manual[]> {
    return this.authHttp.get('http://localhost:8080/manuals/bytag/' + searchparam.slice(1) + '/' + offset)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  newInstruction() {
    return this.authHttp.post('http://localhost:8080/newinstruction/', new Manual())
      .map((response: Response) => {
        this.router.navigateByUrl('/editinstruction/' + response.text());
      });
  }

  postManual(manual: Manual) {
    return this.authHttp.post('http://localhost:8080/updatemanual/', manual)
      .subscribe();
  }

  getTags(): Observable<Tag[]> {
    return this.authHttp.get('http://localhost:8080/tags')
      .map((resp: Response) => {
        return resp.json();
      });
  }

  postTag(tag: Tag) {
    return this.authHttp.post('http://localhost:8080/addtag', tag);
  }

  delete(manualId: number) {
    return this.authHttp.get('http://localhost:8080/deletemanual/' + manualId)
      .subscribe();
  }
}
