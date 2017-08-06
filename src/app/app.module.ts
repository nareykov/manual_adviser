import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Http, HttpModule, RequestOptions} from '@angular/http';
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
import {HomeComponent} from './main/home/home.component';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import { NewComponent } from './main/new/new.component';
import {EditInstructionGuard} from "./guards/edit-instruction.guard";
import {ManualService} from "./Services/manual.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

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
    UsersComponent,
    HomeComponent,
    NewComponent
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
    FroalaViewModule.forRoot(),
    TranslationModule.forRoot()
    // BrowserAnimationsModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    EditInstructionGuard,
    ManualService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public locale: LocaleService, public translation: TranslationService) {
    this.locale.addConfiguration()
      .addLanguages(['en', 'ru'])
      .setCookieExpiration(30)
      .defineLanguage('en');

    this.translation.addConfiguration()
      .addProvider('./assets/locale-');

    this.translation.init();
  }
}

