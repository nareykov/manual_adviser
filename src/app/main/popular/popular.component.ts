import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Language} from 'angular-l10n';
import {Manual} from '../../Models/manual';
import {ManualService} from '../../Services/manual.service';
import {RatingService} from '../../Services/rating.service';
import {Rating} from '../../Models/rating';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
  providers: [ManualService, RatingService]
})
export class PopularComponent implements OnInit {

  private userId = +localStorage.getItem('userId');
  private userRole = localStorage.getItem('userRole');
  @Language() lang: string;
  manuals: Array<Manual> = [];
  estimatedManualIds: Array<number> = [];
  ratings: Array<Rating> = [];

  constructor(private manualService: ManualService, private ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.getManuals();
    this.getRatings();
  }

  getManuals() {
    this.manualService.getPopularManuals().subscribe((data) => this.manuals = data);
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
}
