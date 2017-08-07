import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserProfileService} from '../../Services/user-profile.service';
import {UserProfile} from '../../Models/user-profile';
import {ManualService} from '../../Services/manual.service';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Language, LocaleService} from 'angular-l10n';
import {Rating} from '../../Models/rating';
import {RatingService} from '../../Services/rating.service';


@Component ({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserProfileService, ManualService, RatingService]
})
export class UserComponent implements OnDestroy, OnInit {

  @Language() lang: string;
  private id: number;
  private userId = +localStorage.getItem('userId');
  private userRole = localStorage.getItem('userRole');
  private subscription: Subscription;
  userProfile: UserProfile = new UserProfile;
  private instructionId: number;
  @ViewChild('usernameTag')
  usernameTag: any;
  @ViewChild('originTag')
  originTag: any;
  router: Router;
  ratings: Array<Rating>;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k' })
  );

  constructor( private activateRoute: ActivatedRoute, private userProfileService: UserProfileService,
              private manualService: ManualService, private ratingService: RatingService, router: Router) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    this.router = router;
    // Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.userProfile.image = 'http://res.cloudinary.com/' + this.uploader.cloudName
        + '/image/upload/v1501353111/' + res.public_id + '.jpg';
      return { item, response, status, headers };
    };
  }

  upload() {
    this.uploader.uploadAll();
    this.infoChanged();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.infoChanged();
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getRatings();
  }

  getUserProfile() {
    this.userProfileService.getUserProfile(this.id).subscribe((data) => this.userProfile = data);
  }

  infoChanged() {
    this.userProfile.username = this.usernameTag.nativeElement.textContent;
    this.userProfile.origin = this.originTag.nativeElement.textContent;
    this.userProfileService.postUserProfile(this.userProfile);
  }

  newInstruction() {
    this.manualService.newInstruction().subscribe();
  }

  deleteManual(i) {
    this.manualService.delete(this.userProfile.manualDTOS[i].id);
    this.userProfile.manualDTOS.splice(i, 1);
  }

  getRatings() {
    this.ratingService.getRatingsByUserId().subscribe((data) => this.ratings = data);
  }

  checkEestimatedManuals(manualId: number) {
    if (this.userRole !== 'ROLE_USER' && this.userRole !== 'ROLE_ADMIN') {
      return true;
    }
    for (const rating of this.ratings) {
      if (rating.manual === manualId) {
        return true;
      }
    }
    return false;
  }

  estimate(manualId: number, value: number) {
    this.userProfile.manualDTOS.find(m => m.id === manualId).rating += value;
    this.ratingService.saveRating(new Rating(+localStorage.getItem('userId'), manualId, value));
    this.ratings.push(new Rating(+localStorage.getItem('userId'), manualId, value));
  }
}
