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
import { TagInputModule } from 'ngx-chips';
import {EditStepComponent} from './main/edit-step/edit-step.component';
import {DndModule} from 'ng2-dnd';
import {SavePipe} from './main/edit-step/save.pipe';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import { ManualComponent } from './main/manual/manual.component';
import { UsersComponent } from './main/users/users.component';
import {appRoutes} from './app.routes';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    SavePipe,
    UserComponent,
    EditInstructionComponent,
    EditStepComponent,
    ManualComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TagCloudModule,
    HttpModule,
    FormsModule,
    InfiniteScrollModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    TagInputModule,
    DndModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
    // BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
