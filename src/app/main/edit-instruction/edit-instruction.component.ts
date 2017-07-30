import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ManualService} from '../../Services/manual.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Manual} from '../../Models/manual';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Unit} from '../../Models/unit';
import {Step} from "../../Models/step";

@Component({
  selector: 'app-edit-instruction',
  templateUrl: './edit-instruction.component.html',
  styleUrls: ['./edit-instruction.component.css'],
  providers: [ManualService]
})
export class EditInstructionComponent implements OnInit, OnDestroy {

  manualId: number;
  private subscription: Subscription;
  manual: Manual;
  @ViewChild('nameTag')
  nameTag: any;
  @ViewChild('introductionTag')
  introductionTag: any;
  stepName: string;
  // units: Array<Unit> = [new Unit('text', 'Coffee'), new Unit('text', 'Orange Juice'), new Unit('text', 'Red Wine'),
  //   new Unit('text', 'Unhealthy drink!'), new Unit('text', 'Water')];
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k' })
  );

  constructor(private activateRoute: ActivatedRoute, private manualService: ManualService) {
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

  addText() {
    //this.manual.steps.push(new Step(99, this.stepName, 99));
    this.stepName = '';
  }

  deleteUnit(index: number) {
    this.manual.steps.splice(index, 1);
  }

  getTags() {
    this.manualService.getTags();
  }
}
