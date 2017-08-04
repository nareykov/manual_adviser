import {Component} from '@angular/core';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers: [AuthService]
})
export class HeadComponent {
  searchparam: string;

  constructor(private authService: AuthService) {
  }
}
