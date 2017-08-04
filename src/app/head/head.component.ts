import {Component} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {LocaleService, Language} from 'angular-l10n';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers: [AuthService]
})
export class HeadComponent {
  searchparam: string;
  @Language() lang: string;

  constructor(private authService: AuthService, public locale: LocaleService) {
  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }
}
