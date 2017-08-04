import { Component } from '@angular/core';
import {AuthService} from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {
    authService.handleAuthentication();
  }
}
