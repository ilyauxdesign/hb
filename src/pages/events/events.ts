import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';

// event details page and handbook data provider
// import { EventDetailsPage } from '../event-details/event-details';
import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

// Analytics
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  // define the events variable that we referenced in our template
  events: Array<Object> = [];
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public handbookData: HandbookDataProvider,
  public platform: Platform,
  private ga: GoogleAnalytics) {

    this.platform.ready().then(() => {
      this.ga.trackView("Events and news");
    });
  
  }

  ionViewDidLoad() {
    this.getEventsList();
    this.getFeed();

    //  this.handbookData.getEvents().then(theResult => { this.events = theResult; })
  }
  
  getEventsList () {
    this.handbookData.getEvents();
  }

  getEventDetails(theEventData) {
    console.log(theEventData);
    this.navCtrl.push("EventDetailsPage", { handbookData: theEventData });
  }
  
  getFeed () {
    this.handbookData.getRemoteData();
  }

}