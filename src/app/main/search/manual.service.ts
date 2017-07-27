import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Manual} from './manual';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ManualService {

  constructor(private http: Http) {
  }

  getManualArray(): Observable<Manual[]> {
    return this.http.get('http://localhost:8080/manuals')
      .map((resp: Response) => {
        return resp.json();
      });
  }

  newInstruction() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/newinstruction/', new Manual(), options)
      .subscribe();
  }

}
