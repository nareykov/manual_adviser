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


@Injectable()
export class ManualService {

  constructor(private router: Router, private http: Http) {
  }

  getManual(manualId: number): Observable<Manual> {
    return this.http.get('http://localhost:8080/manual/' + manualId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  searchManuals(searchparam: string): Observable<Manual[]> {
    return this.http.get('http://localhost:8080/manuals/' + searchparam)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  searchManualsByTag(searchparam: string): Observable<Manual[]> {
    return this.http.get('http://localhost:8080/manuals/bytag/' + searchparam.slice(1))
      .map((resp: Response) => {
        return resp.json();
      });
  }

  newInstruction() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8080/newinstruction/', new Manual(), options)
      .map((response: Response) => {
        console.log(response.text());
        this.router.navigateByUrl('/editinstruction/' + response.text());
      });
  }

  postManual(manual: Manual) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/updatemanual/', manual, options)
      .subscribe();
  }

  getTags(): Observable<Tag[]> {
    return this.http.get('http://localhost:8080/tags')
      .map((resp: Response) => {
        return resp.json();
      });
  }
}
