import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserProfileService} from './user-profile.service';
import {UserProfile} from './user-profile';

@Component ({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserProfileService]
})
export class UserComponent implements OnDestroy, OnInit {

  private username: string;
  private subscription: Subscription;
  userProfile: UserProfile;

  @ViewChild('usernameTag')
  usernameTag: HTMLHeadingElement;
  name = 'test';

  constructor(private activateRoute: ActivatedRoute, private userProfileService: UserProfileService) {
    this.subscription = activateRoute.params.subscribe(params => this.username = params['username']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfileService.getUserProfile(this.username).subscribe((data) => this.userProfile = data);
  }

  usernameChanged() {
    this.name = this.usernameTag.textContent;
  }
}
