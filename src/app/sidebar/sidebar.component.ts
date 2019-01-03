import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  messages$: object;
  currentUrl: string = 'Damascus';

  constructor(private data: DataService, private router: Router, private location: Location) { 
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.currentUrl = location.path();
      } else {
        this.currentUrl = '/Damascus'
      }
      this.currentUrl = this.currentUrl.substring(1);
    });
   }

  ngOnInit() {
    this.data.getMessages().subscribe(
      data => {
        let messages = data.feed.entry;
        let entries =[];
        for(let entry of messages){
          let mDate = new Date(entry.updated.$t);
          let mDateStr = mDate.toLocaleString(); 
          let mContent = entry.content.$t;
          let mId = parseInt(mContent.substring(11, mContent.indexOf(',')));
          let mSentiment = mContent.substring(mContent.indexOf('sentiment') + 11);

          // Google maps and Places API is now requiring a billing accout
          // i used @agm/core liberary but it worked only with maps 
          // but i needed places api to get country details e.g: latitude, longitude
          // anyhow i dunno an AI method to recognize city name in a string
          // so i'm just gonna use Embedded Google Maps with a simple city
          // which i'll pass the city manually

          let mCity = '';

          switch(mId){
            case 1: mCity = 'Damascus';
              break;
            case 2: mCity = 'Mogadishu';
              break;
            case 3: mCity = 'Ibiza';
              break;
            case 4: mCity = 'Cairo, Egypt';
              break;
            case 5: mCity = 'Tahrir';
              break;
            case 6: mCity = 'Nairobi';
              break;
            case 7: mCity = 'Kathmandu';
              break;
            case 8: mCity = 'Bernabau, Madrid, Spain';
              break;
            case 9: mCity = 'Athens';
              break;
            case 10: mCity = 'Istanbul';
              break;
          }

          let message = mContent.substring(mContent.indexOf(',')+11, mContent.indexOf('sentiment') - 2);
          entries.push({ id: mId, date: mDateStr, city: mCity,  message: message, sentiment: mSentiment });
        }
        this.messages$ = entries;
      }
    );
  }

}
