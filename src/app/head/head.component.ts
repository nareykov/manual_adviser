import {Component, OnInit} from '@angular/core';
import {Auth0Service} from '../Services/auth0.service';
import {LocaleService, Language} from 'angular-l10n';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers: [Auth0Service]
})
export class HeadComponent implements OnInit {

  searchparam: string;
  userImage: string;
  userId: string;
  @Language() lang: string;

  constructor(private auth0Service: Auth0Service, public locale: LocaleService, private appComponent: AppComponent) {
    this.userId = '';
  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }

  ngOnInit(): void {
    this.appComponent.authEvent.subscribe(d => {
      this.userId = localStorage.getItem('userId');
      this.userImage = localStorage.getItem('userImage');
    });
  }
}
