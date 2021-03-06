import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { AvalibilityplannerPage } from '../pages/avalibilityplanner/avalibilityplanner';
import { GroceriesPage } from '../pages/groceries/groceries';
import { GearsPage } from '../pages/gears/gears';
import { EventPage } from '../pages/events/events';
import { AccommodationsPage } from "../pages/accommodations/accommodations";

import { Events } from 'ionic-angular';
import { EventDetailPage } from "../pages/event-detail/event-detail";
import { ExpenseDashboardPage } from '../pages/expense-dashboard/expense-dashboard';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import { YourLocationPage } from '../pages/your-location/your-location';
import { UserDetailsPage } from "../pages/user-details/user-details";
import {FriendslistPage} from "../pages/friendslist-tabs/friendslist";
import {TransportsPage} from "../pages/transports/transports";
import { WaypointListPage } from '../pages/waypoint-list/waypoint-list';


import * as firebase from 'firebase';
import {RoomPage} from "../pages/chat-room/room/room";

const config = {
  apiKey: "AIzaSyCo8dhuRElM4vzR60IIFpcJdIAUsZg8gF0",
  authDomain: "plevent-carrot-group.firebaseapp.com",
  databaseURL: "https://plevent-carrot-group.firebaseio.com",
  projectId: "plevent-carrot-group",
  storageBucket: "plevent-carrot-group.appspot.com",
  messagingSenderId: "967840979254"
};

@Component({
  templateUrl: 'app.html'
})
export class Plevent {
  @ViewChild(Nav) nav: Nav;


  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public storage: Storage) {
    this.initializeApp();
    this.storage.get('loggedIn').then((val) => {
      if(val){
        this.events.publish('eventsPage:outside');
        this.storage.set('isInsideDets', false);
        this.nav.setRoot(EventPage);
      }else{
        this.nav.setRoot(HomePage);
      }
    });

    this.events.subscribe('eventsPage:outside',()=>{
      this.pages = [
        {title: 'Home', component: EventPage},
        {title: 'Friends', component: FriendslistPage},
        { title: 'Ask Plive', component: ChatbotPage },
        {title: 'My Account', component: UserDetailsPage},
        {title: 'Logout', component: HomePage},

      ];
    });

    this.events.subscribe('eventsPage:inside',()=>{
      this.pages = [
        { title: 'Home', component: EventPage },
        { title: 'Event Details', component: EventDetailPage },
        { title: 'Accommodation Planner', component: AccommodationsPage },
        { title: 'Availability Planner', component: AvalibilityplannerPage },
        { title: 'Waypoint Planner', component: WaypointListPage },
        { title: 'Groceries', component: GroceriesPage },
        { title: 'Gears', component: GearsPage },
        { title: 'Expenses', component: ExpenseDashboardPage },
        { title: 'Transports', component: TransportsPage },
        { title: 'Chat Room', component: RoomPage },
        { title: 'Ask Plive', component: ChatbotPage },
        {title: 'Friends', component: FriendslistPage},
        { title: 'Your Location', component: YourLocationPage },
        { title: 'My Account', component: UserDetailsPage},
        { title: 'Logout', component: HomePage}
      ];
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if(page.title == 'Event Details') {
      this.storage.set('isInsideDets', true);
    }

    if(page.title == 'Logout'){
      this.storage.set('loggedIn', false);
      this.storage.set('isInsideDets', false);
    }else if(page.title == 'Home'){
      this.storage.set('isInsideDets', false);
    }

    this.storage.ready().then(() => {
      this.storage.get('isInsideDets').then((data) => {
        if(data){
          this.events.publish('eventsPage:inside');
        }else{
          this.events.publish('eventsPage:outside');
        }
      });

      this.nav.setRoot(page.component);
    });
  }
}
