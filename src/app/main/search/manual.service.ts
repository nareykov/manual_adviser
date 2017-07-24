import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Manual} from './manual';


@Injectable()
export class ManualService {

  constructor(private http: Http) {
  }

  getManualArray(): Observable<Manual[]> {
    return this.http.get('http://localhost:8080/manuals')
      .map((resp: Response) => {

        const manualList = resp.json();
        const manuals: Manual[] = [];
        for (const index in manualList) {
          console.log(manualList[index]);
          const manual = manualList[index];
          manuals.push({
            name: manual.name,
            date: manual.date,
            introduction: manual.introduction,
            username: manual.username,
            image: manual.image,
            tagNames: manual.tagNames
          });
        }
        return manuals;
      });
  }

}
