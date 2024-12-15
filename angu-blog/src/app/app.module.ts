import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditComponent } from './pages/edit/edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetailsComponent } from './pages/details/details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyPostsComponent } from './pages/my-posts/my-posts/my-posts.component';


@NgModule({
declarations: [
  AppComponent, CreateComponent, HomeComponent, LoginComponent, DashboardComponent, EditComponent, RegisterComponent, DetailsComponent, DetailsComponent, MyProfileComponent,MyPostsComponent

],
  imports: [
    MatSlideToggleModule,
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  
  
  bootstrap: [AppComponent],
  
  
  providers: [provideAnimationsAsync()],
})
export class AppModule { }
