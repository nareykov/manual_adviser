import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {SideComponent} from './side/side.component';
import {MainComponent} from './main/main.component';
import {HeadComponent} from './head/head.component';
import { SearchComponent } from './main/search/search.component';
import { PopularComponent } from './main/popular/popular.component';

const appRoutes: Routes = [
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
    PopularComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
