import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ManualService} from '../../Services/manual.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Manual} from '../../Models/manual';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';

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
  items = ['Pizza', 'Pasta', 'Parmesan'];
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
    tag.id = 'hui';
    // this.manual.tags = this.manual.tags.filter(t => t.name !== tag.text);
    console.log(this.manual.tags);
  }

  addTag(tag) {
    tag.id = 20;
  }

  getTags() {
    this.manualService.getTags();
  }
}
