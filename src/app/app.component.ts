import {Component, EventEmitter, HostListener} from '@angular/core';
import {Auth0Service} from './Services/auth0.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth0Service]
})
export class AppComponent {
  title = 'app';
  b = false;

  authEvent: EventEmitter<string> = new EventEmitter();

  constructor(private auth0Service: Auth0Service) {
    auth0Service.handleAuthentication();
    this.b = false;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (!this.b) {
      this.authEvent.emit('sosi');
      this.b = true;
    }
  }
}
