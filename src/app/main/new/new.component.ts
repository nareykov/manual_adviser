import {Component, OnInit} from '@angular/core';
import {Manual} from '../../Models/manual';
import {ManualService} from '../../Services/manual.service';
import {Rating} from '../../Models/rating';
import {RatingService} from '../../Services/rating.service';
import {Subscription} from 'rxjs/Subscription';
import {Language} from 'angular-l10n';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [ManualService, RatingService]
})
export class NewComponent implements OnInit {

  private userId = +localStorage.getItem('userId');
  private userRole = localStorage.getItem('userRole');
  @Language() lang: string;
  manuals: Array<Manual> = [];
  ratings: Array<Rating> = [];

  offset = 10;

  constructor( private manualService: ManualService, private ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.getManuals();
    this.getRatings();
  }

  getManuals() {
    this.manualService.getNewManuals(-1).subscribe((data) => this.manuals = data);
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
    this.manuals.find(m => m.id === manualId).rating += value;
    this.ratingService.saveRating(new Rating(+localStorage.getItem('userId'), manualId, value));
    this.ratings.push(new Rating(+localStorage.getItem('userId'), manualId, value));
  }

  onScroll() {
    this.manualService.getNewManuals(this.manuals.pop().id).subscribe((data) => this.manuals = this.manuals.concat(data));
    this.offset += 10;
  }
}
