import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Manual} from './manual';
import {ManualService} from './manual.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService, ManualService]
})
export class SearchComponent implements OnInit {

  users: Array<User>;
  manuals: Array<Manual>;

  constructor(private userService: UserService, private manualService: ManualService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getManuals();
  }

  getUsers() {
    this.userService.getUserArray().subscribe((data) => this.users = data);
  }
  getManuals() {
    this.manualService.getManualArray().subscribe((data) => this.manuals = data);
  }
}
