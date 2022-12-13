import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MappageComponent } from './components/mappage/mappage.component';
import { LoginComponent } from './components/admin-components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { LineupEditorComponent } from './components/admin-components/lineup-editor/lineup-editor.component';
import { AbilityLocationEditorComponent } from './components/admin-components/ability-location-editor/ability-location-editor.component';
import { LineupPositionEditorComponent } from './components/admin-components/lineup-position-editor/lineup-position-editor.component';
import { AbilityLocationCreatorComponent } from './components/admin-components/ability-location-creator/ability-location-creator.component';
import { FileUploadComponent } from './components/admin-components/file-upload/file-upload.component';
import { LineupPositionCreatorComponent } from './components/admin-components/lineup-position-creator/lineup-position-creator.component';
import { LineupCreatorComponent } from './components/admin-components/lineup-creator/lineup-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    NavComponent,
    HomeComponent,
    MappageComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    LineupEditorComponent,
    AbilityLocationEditorComponent,
    LineupPositionEditorComponent,
    AbilityLocationCreatorComponent,
    FileUploadComponent,
    LineupPositionCreatorComponent,
    LineupCreatorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
