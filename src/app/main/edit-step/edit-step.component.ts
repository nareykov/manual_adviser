import {Component, OnInit} from '@angular/core';
import {Unit} from '../../Models/unit';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';

@Component({
  selector: 'app-edit-step',
  templateUrl: './edit-step.component.html',
  styleUrls: ['./edit-step.component.css']
})
export class EditStepComponent { // } implements OnInit {

  units: Array<Unit> = [new Unit('text', 'Coffee'), new Unit('text', 'Orange Juice'), new Unit('text', 'Red Wine'),
    new Unit('text', 'Unhealthy drink!'), new Unit('text', 'Water')];

  imageId: string;
  cloudinaryImage: any;
  newVideoName: string;
  editorContent: string;


  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k'}));


  parseYoutubeUrl(url: string): string {
    return 'https://www.youtube.com/embed/' + url.split('watch?v=').pop() + '?ecver=1';
  }

  addVideo(content: string) {
    this.units.push(new Unit('video', content));
  }

  addImage(public_id: string) {
    this.units.push(new Unit('image', 'http://res.cloudinary.com/' + this.uploader.cloudName
      + '/image/upload/v1501353111/' + public_id + '.jpg'));
    console.log();
  }

  addText() {
    this.units.push(new Unit('text', this.editorContent));
    this.editorContent = '';
  }

  deleteUnit(index: number) {
    this.units.splice(index, 1);
  }


  constructor() {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      //  this.manual.image = res.public_id;
      this.addImage(res.public_id);
      return {item, response, status, headers};
    };
  }

  upload() {
    this.uploader.uploadAll();
  }
}
