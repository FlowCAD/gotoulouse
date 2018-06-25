import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let northEastBound = L.latLng(43.75, 1.76), southWestBound = L.latLng(43.43, 1.02), bounds = L.latLngBounds(northEastBound, southWestBound);
    const mymap = L.map('map', {minZoom: 12}).setView([43.6, 1.44], 13).setMaxBounds(bounds);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    
  const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  L.marker([43.6, 1.44], {icon: myIcon}).addTo(mymap);
  
  const style_mapicon = L.AwesomeMarkers.icon({
    prefix: 'fa',
    icon: 'star',
    markerColor: 'red'
  });

  this.http.get('https://data.toulouse-metropole.fr/api/v2/catalog/datasets/stations-de-metro/records?rows=100&pretty=true&timezone=UTC').subscribe((data: any) => {
    data.records.forEach((mydata:any) => {
      L.marker([mydata.record.fields.geo_shape.geometry.coordinates[1], mydata.record.fields.geo_shape.geometry.coordinates[0]], {icon: style_mapicon}).addTo(mymap);
      console.log(mydata.record.fields);
    });
  });

  }
}
