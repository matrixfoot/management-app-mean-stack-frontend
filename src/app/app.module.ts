import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ModifyProjectComponent } from './modify-project/modify-project.component';

@NgModule({
  declarations: [
    AppComponent,
   
    PartThreeComponent,
    PartFourComponent,
    DefaultComponent,
    HeaderComponent,
   
    LoginComponent,
    SignupComponent,
    ProjetListComponent,
    NewProjectComponent,
    ViewProjectComponent,
    ModifyProjectComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
