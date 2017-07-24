import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {SideComponent} from './side/side.component';
import {MainComponent} from './main/main.component';
import {HeadComponent} from './head/head.component';
import {SearchComponent} from './main/search/search.component';
import {PopularComponent} from './main/popular/popular.component';
import {TagcloudComponent} from './side/tagcloud/tagcloud.component';
import {TagCloudModule} from 'angular-tag-cloud-module';
import {DndModule} from 'ng2-dnd';
import {UpdateprofileComponent} from './main/updateprofile/updateprofile.component';

const appRoutes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'update', component: UpdateprofileComponent},
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
    TagcloudComponent,
    UpdateprofileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TagCloudModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
