import { Component, OnInit } from '@angular/core';
import { OpendataService } from '../shared/opendata.service';

import * as L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private data: OpendataService
  ) { }

  ngOnInit() {
    let northEastBound = L.latLng(43.75, 1.76), southWestBound = L.latLng(43.43, 1.02), bounds = L.latLngBounds(northEastBound, southWestBound);
    const mymap = L.map('map', { minZoom: 12 }).setView([43.6, 1.44], 13).setMaxBounds(bounds);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    const subwayMarkerSymbol = L.AwesomeMarkers.icon({ icon: 'fa-subway', prefix: 'fa', markerColor: 'blue', iconColor: 'white' });
    const bikeMarkerSymbol = L.AwesomeMarkers.icon({ icon: 'fa-bicycle', prefix: 'fa', markerColor: 'darkpurple', iconColor: 'white' });

    const redMarker = L.AwesomeMarkers.icon({ icon: 'fa-car', markerColor: 'red', iconColor: 'white', prefix: 'fa' });
    L.marker([43.61, 1.45], { icon: redMarker }).addTo(mymap);

    this.data.getSubways().subscribe((data: any) => {
      data.records.forEach((mydata: any) => {
        L.marker([mydata.record.fields.geo_shape.geometry.coordinates[1], mydata.record.fields.geo_shape.geometry.coordinates[0]], { icon: subwayMarkerSymbol })
          .addTo(mymap)
          .bindPopup(mydata.record.fields.nom + " (ligne " + mydata.record.fields.ligne + ")");
      });
    });

    this.data.getBikes().subscribe((data: any) => {
      console.log(data);
      data.forEach((mydata: any) => {
        L.marker([mydata.position.lat, mydata.position.lng], { icon: bikeMarkerSymbol })
          .addTo(mymap)
          .bindPopup(mydata.name + "<br /> (Vélos disponibles: " + mydata.available_bikes + ")");
      });
    });
  }
}
