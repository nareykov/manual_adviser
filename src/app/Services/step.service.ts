import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Step} from '../Models/step';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Unit} from '../Models/unit';

@Injectable()
export class StepService {

  constructor(private http: Http) {
  }

  getStep(stepId: number): Observable<Step> {
    return this.http.get('http://localhost:8080/step/' + stepId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  delete(stepId: number) {
    return this.http.get('http://localhost:8080/deletestep/' + stepId)
      .subscribe();
  }

  deleteUnit(unitId: number) {
    return this.http.get('http://localhost:8080/deleteunit/' + unitId)
      .subscribe();
  }

  postStep(step: Step) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8080/addStep', step, options);
  }

  postUnit(unit: Unit) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8080/addUnit', unit, options);
  }

}
