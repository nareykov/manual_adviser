import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService]
})
export class SearchComponent implements OnInit {

  users: Array<User>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUserArray().subscribe((data) => this.users = data);
  }
}
