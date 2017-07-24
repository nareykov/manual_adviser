import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {SideComponent} from './side/side.component';
import {MainComponent} from './main/main.component';
import {HeadComponent} from './head/head.component';
import {TagcloudComponent} from './side/tagcloud/tagcloud.component';
import {TagCloudModule} from 'angular-tag-cloud-module';
import { SearchComponent } from './main/search/search.component';
import { PopularComponent } from './main/popular/popular.component';
import { LoginComponent } from './main/login/login.component';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'popular', component: PopularComponent},
  {path: '**', redirectTo: '/popular'}
];

@NgModule({
  declarations: [
    AppComponent,
    SideComponent,
    MainComponent,
    HeadComponent,
    SearchComponent,
    PopularComponent,
    LoginComponent,
    TagcloudComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TagCloudModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
