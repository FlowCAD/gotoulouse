import { Component, OnInit } from '@angular/core';
import { OpendataService } from '@app/shared/opendata.service';
import { MarkersService } from '@app/shared/markers.service';

import * as L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private opendataService: OpendataService,
    private markersService: MarkersService
  ) { }

  ngOnInit() {
    let northEastBound = L.latLng(43.75, 1.76), southWestBound = L.latLng(43.43, 1.02), bounds = L.latLngBounds(northEastBound, southWestBound);
    const mymap = L.map('map', { minZoom: 12 }).setView([43.6, 1.44], 13).setMaxBounds(bounds);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    this.opendataService.getSubways().subscribe((data: any) => {
      data.records.forEach((mydata: any) => {
        L.marker(
          [mydata.record.fields.geo_shape.geometry.coordinates[1], mydata.record.fields.geo_shape.geometry.coordinates[0]],
          { icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol("subway")) }
        )
          .addTo(mymap)
          .bindPopup(mydata.record.fields.nom + " (ligne " + mydata.record.fields.ligne + ")");
      });
    });

    this.opendataService.getBikes().subscribe((data: any) => {
      console.log(data);
      data.forEach((mydata: any) => {
        if (mydata.status == "OPEN") {
          L.marker(
            [mydata.position.lat, mydata.position.lng],
            { icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol("bike")) }
          )
            .addTo(mymap)
            .bindPopup("<b>" + mydata.name + "</b><br /> Vélos disponibles: <b>" + mydata.available_bikes + "</b><br />Emplacements disponibles: <b>" + mydata.available_bike_stands + "</b>");
        }
      });
    });
  }
}
