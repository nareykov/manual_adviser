import { Component } from '@angular/core';
import {Auth0Service} from './Services/auth0.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth0Service]
})
export class AppComponent {
  title = 'app';

  constructor(private auth0Service: Auth0Service) {
    auth0Service.handleAuthentication();
  }
}
