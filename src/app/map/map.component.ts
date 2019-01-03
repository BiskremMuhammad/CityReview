import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  myurl: string = 'https://maps.google.com/maps?q=Damascus&t=&z=8&ie=UTF8&iwloc=&output=embed';

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { 
    this.route.params.subscribe(
      params => this.myurl = 'https://maps.google.com/maps?q='+params.city+'&t=&z=8&ie=UTF8&iwloc=&output=embed'
    );
   }

  ngOnInit() {
  }

}
