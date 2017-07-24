import {Component, OnInit} from '@angular/core';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module';
import {TagCloudService} from './tag-cloud.service';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css'],
  providers: [TagCloudService]
})
export class TagcloudComponent implements OnInit {

  options: CloudOptions = {
    width: 280,
    height: 400,
    overflow: true,
  };


  tags: Array<CloudData>;

  constructor(private tagCloudService: TagCloudService) {
  }

  installTags() {
    this.tagCloudService.getData().subscribe((data) => this.tags = data);
    for (const tag of this.tags) {
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
