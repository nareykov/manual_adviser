import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Step} from '../Models/step';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Unit} from '../Models/unit';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class StepService {

  constructor(private authHttp: AuthHttp) {
  }

  getStep(stepId: number): Observable<Step> {
    return this.authHttp.get('http://localhost:8080/step/' + stepId)
      .map((resp: Response) => {
        return resp.json();
      });
  }

  delete(stepId: number) {
    return this.authHttp.get('http://localhost:8080/deletestep/' + stepId)
      .subscribe();
  }

  deleteUnit(unitId: number) {
    return this.authHttp.get('http://localhost:8080/deleteunit/' + unitId)
      .subscribe();
  }

  postStep(step: Step) {
    return this.authHttp.post('http://localhost:8080/addStep', step);
  }

  updateStep(step: Step) {
    return this.authHttp.post('http://localhost:8080/updatestep/', step)
      .subscribe();
  }

  postUnit(unit: Unit) {
    return this.authHttp.post('http://localhost:8080/addUnit', unit);
  }
  getUserIdByStepId(stepId: string): Observable<number> {
    return this.authHttp.get('http://localhost:8080/userIdByStepId/' + stepId)
      .map((resp: Response) => {
        return resp.json();
      });
  }
}
