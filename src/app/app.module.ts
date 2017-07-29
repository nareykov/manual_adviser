import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {SideComponent} from './side/side.component';
import {MainComponent} from './main/main.component';
import {HeadComponent} from './head/head.component';
import {TagcloudComponent} from './side/tagcloud/tagcloud.component';
import {TagCloudModule} from 'angular-tag-cloud-module';
import {SearchComponent} from './main/search/search.component';
import {PopularComponent} from './main/popular/popular.component';
import {LoginComponent} from './main/login/login.component';
import { UserComponent } from './main/user/user.component';
import {FormsModule} from '@angular/forms';
import { EditInstructionComponent } from './main/edit-instruction/edit-instruction.component';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {FileUploadModule} from 'ng2-file-upload';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TagInputModule} from 'ngx-chips/dist/modules';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'search/:searchparam', component: SearchComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'editinstruction/:manualId', component: EditInstructionComponent},
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
    TagcloudComponent,
    UserComponent,
    EditInstructionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TagCloudModule,
    HttpModule,
    FormsModule,
    InfiniteScrollModule,
    TagInputModule,
    BrowserAnimationsModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
