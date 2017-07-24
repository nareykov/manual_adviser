import {Component, OnInit} from '@angular/core';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module';
import {HttpService} from './tagcloud-http.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css'],
  providers: [HttpService]
})
export class TagcloudComponent implements OnInit {

  options: CloudOptions = {
    width: 280,
    height: 400,
    overflow: true,
  };

   data: Array<CloudData> = [
     {text: 'barbos', weight: 2, link: 'https://google.com'},
     {text: 'Weigh', weight: 1, link: 'https://google.com'},
     {text: 'nigga', weight: 3, link: 'https://google.com'},
     {text: 'krasava', weight: 2, link: 'https://google.com'},
     {text: 'zalupa Kita', weight: 1, link: 'https://google.com'},
     {text: 'bar', weight: 3, link: 'https://google.com'},

   ];

  tags: Array<CloudData>;


  httpService: HttpService;

  installTags() {
 //   this.httpService.getData().subscribe((data: Response) => this.tags = data.json());
    for (const tag of this.data) {
      tag.color = this.getRandomColor();
    }
  }

  ngOnInit(): void {
    this.installTags();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
