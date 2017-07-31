import {Component, OnInit} from '@angular/core';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module';
import {TagCloudService} from '../../Services/tag-cloud.service';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css'],
  providers: [TagCloudService]
})
export class TagcloudComponent implements OnInit {

  options: CloudOptions = {
    width: 280,
    height: 550,
    overflow: true,
  };

  tags: Array<CloudData>;

  constructor(private tagCloudService: TagCloudService) {}

  installTags() {
    this.tagCloudService.getData().subscribe((data) => this.tags = data);
  }

  ngOnInit(): void {
    this.installTags();
  }
}
