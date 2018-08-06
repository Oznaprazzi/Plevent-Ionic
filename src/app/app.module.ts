import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { AvalibilityplannerPage } from '../pages/avalibilityplanner/avalibilityplanner';
import { AccommodationPlannerPage } from "../pages/accommodationPlanner/accommodationPlanner"
import { AddAccommodationPage } from "../pages/addAccommodation/addAccommodation"
import { SignupPage } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import {CreateEventPage} from "../pages/createEvents/createevent";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventPage,
    AvalibilityplannerPage,
    AddAccommodationPage,
    AccommodationPlannerPage,
    SignupPage,
    CreateEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventPage,
    AvalibilityplannerPage,
    AddAccommodationPage,
    AccommodationPlannerPage,
    SignupPage,
    CreateEventPage
  ],
  providers: [
    StatusBar,
    HomePage,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
