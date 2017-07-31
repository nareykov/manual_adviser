import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ManualService} from '../../Services/manual.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Manual} from '../../Models/manual';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Step} from '../../Models/step';
import {StepService} from '../../Services/step.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css'],
  providers: [ManualService, StepService]
})
export class ManualComponent implements OnInit {

  manualId: number;
  private subscription: Subscription;
  manual: Manual;
  @ViewChild('nameTag')
  nameTag: any;
  @ViewChild('introductionTag')
  introductionTag: any;
  modelHeader = '';
  modelContent = new Step(0, '', 0) ;
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

  parseYoutubeUrl(url: string): string {
    return 'https://www.youtube.com/embed/' + url.split('watch?v=').pop() + '?ecver=1';
  }

  ngOnInit() {
    this.manualService.getManual(this.manualId).subscribe((data) => this.manual = data);
  }

  showStep(i) {
    this.modelHeader = this.manual.steps[i].name;
    this.modelContent = this.manual.steps[i];
  }
}
