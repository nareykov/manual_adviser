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

  private subscription: Subscription;
  @Language() lang: string;
  manuals: Array<Manual> = [];
  estimatedManualIds: Array<number> = [];
  offset = 10;

  constructor( private manualService: ManualService, private ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.getManuals();
  }

  getManuals() {
    this.manualService.getNewManuals(-1).subscribe((data) => this.manuals = data);
  }

  checkEestimatedManuals(manualId: number) {
    return this.estimatedManualIds.indexOf(manualId) > -1;
  }

  estimate(userId: number, manualId: number, value: number) {
    this.ratingService.saveRating(new Rating(userId, manualId, value));
    this.manuals.find(m => m.id === manualId).rating += value;
    this.estimatedManualIds.push(manualId);
  }

  onScroll() {
    this.manualService.getNewManuals(this.manuals.pop().id).subscribe((data) => this.manuals = this.manuals.concat(data));
    this.offset += 10;
  }

}
