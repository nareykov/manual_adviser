import {AfterContentChecked, AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked {
  image: string;

  @Language() lang: string;
  constructor() { }

  ngAfterViewChecked() {
    this.image = localStorage.getItem('userImage');
  }


}
