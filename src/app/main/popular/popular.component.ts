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

  private subscription: Subscription;
  @Language() lang: string;
  manuals: Array<Manual> = [];
  estimatedManualIds: Array<number> = [];

  constructor(private manualService: ManualService, private ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.getManuals();
  }

  getManuals() {
    this.manualService.getPopularManuals().subscribe((data) => this.manuals = data);
  }

  checkEestimatedManuals(manualId: number) {
    return this.estimatedManualIds.indexOf(manualId) > -1;
  }

  estimate(userId: number, manualId: number, value: number) {
    this.ratingService.saveRating(new Rating(userId, manualId, value));
    this.manuals.find(m => m.id === manualId).rating += value;
    this.estimatedManualIds.push(manualId);
  }
}
