import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Manual} from './manual';
import {ManualService} from './manual.service';
import {Rating} from './rating';
import {RatingService} from './rating.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService, ManualService, RatingService]
})
export class SearchComponent implements OnInit {

  private searchparam: string;
  private subscription: Subscription;

  users: Array<User>;
  manuals: Array<Manual> = [];
  estimatedManualIds: Array<number> = [];

  constructor(private activateRoute: ActivatedRoute, private userService: UserService,
              private manualService: ManualService, private ratingService: RatingService, private router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.getManuals();
        }
      }
    );
    this.subscription = activateRoute.params.subscribe(params => this.searchparam = params['searchparam']);
  }

// TODO NavigationEnd
  ngOnInit(): void {
    this.getUsers();
    this.getManuals();
    console.log(this.searchparam);
  }

  getUsers() {
    this.userService.getUserArray().subscribe((data) => this.users = data);
  }

  getManuals() {
    if (this.searchparam.charAt(0) === '@') {
      this.manualService.searchManualsByTag(this.searchparam).subscribe((data) => this.manuals = data);
    } else {
      this.manualService.searchManuals(this.searchparam).subscribe((data) => this.manuals = this.manuals = data);
    }
  }

  checkEestimatedManuals(manualId: number) {
    return this.estimatedManualIds.indexOf(manualId) > -1;
  }

  estimate(userId: number, manualId: number, value: number) {
    this.ratingService.saveRating(new Rating(userId, manualId, value));
    this.manuals[manualId].rating += value;
    this.estimatedManualIds.push(manualId);
  }

  onScroll() {
    if (this.searchparam.charAt(0) === '@') {
      this.manualService.searchManualsByTag(this.searchparam).subscribe((data) => this.manuals = this.manuals.concat(data));
    } else {
      this.manualService.searchManuals(this.searchparam).subscribe((data) => this.manuals = this.manuals.concat(data));
    }
  }
}
