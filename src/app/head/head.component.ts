import {Component} from '@angular/core';
import {Auth0Service} from '../Services/auth0.service';
import {LocaleService, Language} from 'angular-l10n';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers: [Auth0Service]
})
export class HeadComponent {
  searchparam: string;
  @Language() lang: string;

  constructor(private auth0Service: Auth0Service, public locale: LocaleService) {
  }
  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }
}
