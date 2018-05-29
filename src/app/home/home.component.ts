import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;

  constructor() { }

  ngOnInit() {
    let northEastBound = L.latLng(43.68, 1.68), southWestBound = L.latLng(43.52, 1.35), bounds = L.latLngBounds(northEastBound, southWestBound);
    const mymap = L.map('map').setView([43.599560, 1.441079], 13).setMaxBounds(bounds);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
  }

}
