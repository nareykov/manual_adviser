import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Manual} from '../../Models/manual';
import {ManualService} from '../../Services/manual.service';
import {Rating} from '../../Models/rating';
import {RatingService} from '../../Services/rating.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Language} from 'angular-l10n';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService, ManualService, RatingService]
})
export class SearchComponent implements OnInit {

  private searchparam: string;
  private subscription: Subscription;
  @Language() lang: string;
  manuals: Array<Manual> = [];
  ratings: Array<Rating> = [];
  offset = 10;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'diwv72pih', uploadPreset: 'gx1d3d3k'})
  );

  constructor(private activateRoute: ActivatedRoute, private manualService: ManualService,
              private ratingService: RatingService, private router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.getManuals();
        }
      }
    );
    this.subscription = activateRoute.params.subscribe(params => this.searchparam = params['searchparam']);
  }

  ngOnInit(): void {
    this.getManuals();
    this.getRatings();
  }

  getManuals() {
    if (this.searchparam.charAt(0) === '@') {
      this.manualService.searchManualsByTag(this.searchparam, 0).subscribe((data) => this.manuals = data);
    } else {
      this.manualService.searchManuals(this.searchparam, 0).subscribe((data) => this.manuals = this.manuals = data);
    }
  }

  getRatings() {
    this.ratingService.getRatingsByUserId().subscribe((data) => this.ratings = data);
  }

  checkEestimatedManuals(manualId: number) {
    for (const rating of this.ratings) {
      if (rating.manual === manualId) {
        return true;
      }
    }
    return false;
  }

  estimate(manualId: number, value: number) {
    this.manuals.find(m => m.id === manualId).rating += value;
    this.ratingService.saveRating(new Rating(+localStorage.getItem('userId'), manualId, value));
    this.ratings.push(new Rating(+localStorage.getItem('userId'), manualId, value));
  }

  onScroll() {
    if (this.searchparam.charAt(0) === '@') {
      this.manualService.searchManualsByTag(this.searchparam, this.offset).subscribe((data) => this.manuals = this.manuals.concat(data));
    } else {
      this.manualService.searchManuals(this.searchparam, this.offset).subscribe((data) => this.manuals = this.manuals.concat(data));
    }
    this.offset += 10;
  }
}
