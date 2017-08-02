import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ManualService} from '../../Services/manual.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Manual} from '../../Models/manual';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Step} from '../../Models/step';
import {StepService} from '../../Services/step.service';

@Component({
  selector: 'app-edit-instruction',
  templateUrl: './edit-instruction.component.html',
  styleUrls: ['./edit-instruction.component.css'],
  providers: [ManualService, StepService]
})
export class EditInstructionComponent implements OnInit, OnDestroy {

  manualId: number;
  private subscription: Subscription;
  manual: Manual;
  @ViewChild('nameTag')
  nameTag: any;
  @ViewChild('introductionTag')
  introductionTag: any;
  stepName = 'stepname';
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k' })
  );

  constructor(private activateRoute: ActivatedRoute, private manualService: ManualService, private stepService: StepService) {
    this.subscription = activateRoute.params.subscribe(params => this.manualId = params['manualId']);
    // Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.manual.image = res.public_id;
      return { item, response, status, headers };
    };
  }

  upload() {
    this.uploader.uploadAll();
  }

  ngOnInit() {
    this.manualService.getManual(this.manualId).subscribe((data) => this.manual = data);
  }

  ngOnDestroy() {
    this.infoChanged();
  }

  infoChanged() {
    this.manual.name = this.nameTag.nativeElement.textContent;
    this.manual.introduction = this.introductionTag.nativeElement.textContent;
    this.manualService.postManual(this.manual);
  }

  removeTag(tag) {
    this.infoChanged();
  }

  addTag(tag) {
    tag.id = 0;
    this.manualService.postTag(tag).subscribe(data => tag.id = Number(data.text()));
    this.infoChanged();
  }

  addStep() {
    const step = new Step(this.manual.id, this.stepName, this.manual.steps.length);
    this.stepService.postStep(step).subscribe(data => step.id = Number(data.text()));
    this.manual.steps.push(step);
    this.stepName = '';
  }

  deleteStep(index: number) {
    this.stepService.delete(this.manual.steps[index].id);
    this.manual.steps.splice(index, 1);
  }

  dragStep() {
    this.setOrder()
    this.infoChanged();
  }

  setOrder() {
    for (const step of this.manual.steps) {
      step.order = this.manual.steps.indexOf(step);
    }
  }

  publish() {
    this.manual.published = true;
    this.infoChanged();
  }
}
