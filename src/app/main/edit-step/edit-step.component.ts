import {Component, OnInit} from '@angular/core';
import {Unit} from '../../Models/unit';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {ActivatedRoute} from '@angular/router';
import {StepService} from '../../Services/step.service';
import {Step} from '../../Models/step';
import {Subscription} from 'rxjs/Subscription';
import {Language} from 'angular-l10n';


@Component({
  selector: 'app-edit-step',
  templateUrl: './edit-step.component.html',
  styleUrls: ['./edit-step.component.css'],
  providers: [StepService]
})
export class EditStepComponent implements OnInit {

  @Language() lang: string;
  stepId: number;
  step: Step = new Step(0, '', 0);
  private subscription: Subscription;
  imageId: string;
  cloudinaryImage: any;
  newVideoName: string;
  editorContent: string;
// TODO: order нормальный запилить, чтобы при удалении работал

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k'}));

  constructor(private activateRoute: ActivatedRoute, private stepService: StepService) {
    this.subscription = activateRoute.params.subscribe(params => this.stepId = params['stepId']);
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      //  this.manual.image = res.public_id;
      this.addImage(res.public_id);
      return {item, response, status, headers};
    };
  }

  ngOnInit() {
      this.stepService.getStep(this.stepId).subscribe((data) => this.step = data);
  }

  parseYoutubeUrl(url: string): string {
    return 'https://www.youtube.com/embed/' + url.split('watch?v=').pop() + '?ecver=1';
  }

  addVideo(content: string) {
    const unit = new Unit(this.stepId, 'video', content, this.step.units.length);
    this.stepService.postUnit(unit).subscribe(data => unit.id = Number(data.text()));
    this.step.units.push(unit);
  }

  addImage(public_id: string) {
    const unit = new Unit(this.stepId, 'image', 'http://res.cloudinary.com/' + this.uploader.cloudName
      + '/image/upload/v1501353111/' + public_id + '.jpg', this.step.units.length);
    this.stepService.postUnit(unit).subscribe(data => unit.id = Number(data.text()));
    this.step.units.push(unit);
    console.log(this.step.units);
  }

  setImageEffect(index: number, effect: string) {
    this.step.units[index].content = this.step.units[index].content.substr(0, 49) + effect +
      this.step.units[index].content.substr(-36, 36);
    this.stepService.updateStep(this.step);
  }

  addText() {
    console.log(this.step.units);
    const unit = new Unit(this.stepId, 'text', this.editorContent, this.step.units.length);
    this.stepService.postUnit(unit).subscribe(data => unit.id = Number(data.text()));
    this.step.units.push(unit);
    this.editorContent = '';
  }

  deleteUnit(index: number) {
    this.stepService.deleteUnit(this.step.units[index].id);
    this.step.units.splice(index, 1);
  }

  dragStep() {
    this.setOrder();
    this.stepService.updateStep(this.step);
  }

  setOrder() {
    for (const unit of this.step.units) {
      unit.order = this.step.units.indexOf(unit);
    }
  }

  upload() {
    this.uploader.uploadAll();
  }
}
