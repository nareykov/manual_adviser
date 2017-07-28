import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Manual} from './manual';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from '@angular/router';


@Injectable()
export class ManualService {

  constructor(private router: Router, private http: Http) {
  }

  kek: string;

  getManualArray(): Observable<Manual[]> {
    return this.http.get('http://localhost:8080/manuals')
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
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    const options = new RequestOptions({headers: headers});
    // return this.http.post('http://localhost:8080/newinstruction/', new Manual(), options)
    //   .subscribe();
    return this.http.post('http://localhost:8080/newinstruction/', new Manual(), options)
      .map((response: Response) => {
        console.log(response.text());
        this.router.navigateByUrl('/editinstruction/' + response.text());
      });
  }

}
