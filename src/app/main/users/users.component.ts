import { Component, OnInit } from '@angular/core';
import {User} from '../../Models/user';
import {UserService} from '../../Services/user.service';
import {Language} from 'angular-l10n';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  @Language() lang: string;
  users: Array<User>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUserArray().subscribe((data) => this.users = data);
  }

}
