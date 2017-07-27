import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Manual} from './manual';
import {ManualService} from './manual.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component ({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService, ManualService]
})
export class SearchComponent implements OnInit {

  private searchparam: string;
  private subscription: Subscription;

  users: Array<User>;
  manuals: Array<Manual>;

  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private manualService: ManualService) {
    this.subscription = activateRoute.params.subscribe(params => this.searchparam = params['searchparam']);
  }
// TODO NavigationEnd
  ngOnInit(): void {
    this.getUsers();
    this.getManuals();
    console.log(this.searchparam);
  }

  getUsers() {
    this.userService.getUserArray().subscribe((data) => this.users = data);
  }
  getManuals() {
    this.manualService.getManualArray().subscribe((data) => this.manuals = data);
  }
}
