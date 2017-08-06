import { Routes } from '@angular/router';
import {LoginComponent} from './main/login/login.component';
import {SearchComponent} from './main/search/search.component';
import {ManualComponent} from './main/manual/manual.component';
import {PopularComponent} from './main/popular/popular.component';
import {UsersComponent} from './main/users/users.component';
import {EditStepComponent} from './main/edit-step/edit-step.component';
import {UserComponent} from './main/user/user.component';
import {EditInstructionComponent} from './main/edit-instruction/edit-instruction.component';
import {HomeComponent} from './main/home/home.component';
import {NewComponent} from "./main/new/new.component";


export const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'search/:searchparam', component: SearchComponent},
  {path: 'manual/:manualId', component: ManualComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'users', component: UsersComponent},
  {path: 'editstep/:stepId', component: EditStepComponent},
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'editinstruction/:manualId', component: EditInstructionComponent},
  {path: '**', redirectTo: '/home'}
];
