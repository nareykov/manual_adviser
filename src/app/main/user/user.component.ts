import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserProfileService} from './user-profile.service';
import {UserProfile} from './user-profile';
import {ManualService} from '../search/manual.service';


@Component ({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserProfileService, ManualService]
})
export class UserComponent implements OnDestroy, OnInit {

  private id: number;
  private subscription: Subscription;
  private userProfile: UserProfile;
  private instructionId: number;
  @ViewChild('usernameTag')
  usernameTag: any;
  @ViewChild('originTag')
  originTag: any;
  router: Router;

  constructor(private activateRoute: ActivatedRoute, private userProfileService: UserProfileService,
              private manualService: ManualService, router: Router) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    this.router = router;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfileService.getUserProfile(this.id).subscribe((data) => this.userProfile = data);
  }

  infoChanged() {
    this.userProfile.username = this.usernameTag.nativeElement.textContent;
    this.userProfile.origin = this.originTag.nativeElement.textContent;
    console.log(this.userProfile.username);
    this.userProfileService.postUserProfile(this.userProfile);
  }

  newInstruction() {
    this.instructionId = 3;
    this.manualService.newInstruction();
    this.router.navigateByUrl('/editinstruction/' + this.instructionId);
  }
}
