import {Injectable} from '@angular/core';
import {CloudData} from 'angular-tag-cloud-module';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class TagCloudService {

  constructor(private http: Http, private authHttp: AuthHttp) {
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getData(): Observable<CloudData[]> {
    return this.authHttp.get('http://localhost:8080/tags')
      .map((resp: Response) => {

        const tagsList = resp.json();
        const tags: CloudData[] = [];
        for (const index in tagsList) {
          const tag = tagsList[index];
          tags.push({text: tag.name, weight: tag.weight, link: 'http://localhost:4200/search/@' + tag.name, color: this.getRandomColor()});
        }
        return tags;
      });
  }
}
