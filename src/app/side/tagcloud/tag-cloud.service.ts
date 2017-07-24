import { Injectable } from '@angular/core';
import {CloudData} from 'angular-tag-cloud-module';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TagCloudService {

  constructor(private http: Http) { }

  getData(): Observable<CloudData[]> {
    return this.http.get('http://localhost:8080/tags')
      .map((resp: Response) => {

        const tagsList = resp.json();
        const tags: CloudData[] = [];
        for (const index in tagsList) {
          console.log(tagsList[index]);
          const tag = tagsList[index];
          tags.push({text: tag.text, weight: tag.weight, link: tag.link});
        }
        return tags;
      });
  }
}
