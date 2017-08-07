import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Manual} from '../../Models/manual';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Step} from '../../Models/step';
import {ManualService} from '../../Services/manual.service';
import {StepService} from '../../Services/step.service';
import {CommentService} from '../../Services/comment.service';
import {Comment} from '../../Models/comment';
import {Language} from 'angular-l10n';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css'],
  providers: [ManualService, StepService, CommentService]
})
export class ManualComponent implements OnInit {

  @Language() lang: string;
  manualId: number;
  private subscription: Subscription;
  manual: Manual;
  @ViewChild('nameTag')
  nameTag: any;
  @ViewChild('introductionTag')
  introductionTag: any;
  modelHeader = '';
  stepIndex: number;
  showRightArrow = false;
  showLeftArrow = false;
  private userRole = localStorage.getItem('userRole');
  textAreaContent = '';
  modelContent = new Step(0, '', 0);
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k'})
  );

  constructor(private manualService: ManualService, private stepService: StepService, private commentService: CommentService,
              private activateRoute: ActivatedRoute) {
    this
      .subscription = activateRoute.params.subscribe(params => this.manualId = params['manualId']);
    // Override onSuccessItem to retrieve the imageId
    this
      .uploader
      .onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.manual.image = res.public_id;
      return {item, response, status, headers};
    };
  }

  parseYoutubeUrl(url: string): string {
    return 'https://www.youtube.com/embed/' + url.split('watch?v=').pop() + '?ecver=1';
  }

  ngOnInit() {
    this.manualService.getManual(this.manualId).subscribe((data) => this.manual = data);
  }

  showStep(i) {
    this.textAreaContent = '';
    this.stepIndex = i;
    this.showArrows(i);
    this.modelHeader = this.manual.steps[i].name;
    this.modelContent = this.manual.steps[i];
    this.commentService.getCommentsByStepId(this.manual.steps[i].id).subscribe(
      (data) => this.modelContent.comments = data);
    console.log(this.modelContent.comments);
  }

  showArrows(i) {
    if (i === 0) {
      this.showLeftArrow = false;
    } else {
      this.showLeftArrow = true;
    }
    if (i === this.manual.steps.length - 1) {
      this.showRightArrow = false;
    } else {
      this.showRightArrow = true;
    }
  }

  hideArrows() {
    this.showLeftArrow = false;
    this.showRightArrow = false;
  }

  showLeftStep() {
    this.showStep(--this.stepIndex);
  }

  showRightStep() {
    this.showStep(++this.stepIndex);
  }

  saveComment( stepId: number) {
    const comment = new Comment();
    comment.text = this.textAreaContent;
    comment.stepId = stepId;
    comment.userImage = localStorage.getItem('userImage');
    comment.userId = +localStorage.getItem('userId');
    comment.username = localStorage.getItem('userName');
    this.commentService.saveComments(comment).subscribe(data => comment.id = Number(data.text()));
    this.manual.steps.filter(step => step.id === stepId).pop().comments.push(comment);
    this.textAreaContent = '';
  }
}
