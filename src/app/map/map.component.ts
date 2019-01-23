import { Component, OnInit } from '@angular/core';

import { OpendataService } from '@app/shared/services/opendata.service';
import { MarkersService } from '@app/shared/services/markers.service';
import { ControlService } from '@app/shared/services/control.service';

import * as L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';
import 'leaflet.markercluster/dist/leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private opendataService: OpendataService,
    private markersService: MarkersService,
    private controlService: ControlService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const northEastBound = L.latLng(43.75, 1.76), southWestBound = L.latLng(43.43, 1.02), bounds = L.latLngBounds(northEastBound, southWestBound);
    const mymap = L.map('map', { minZoom: 12, maxZoom: 18 }).setView([43.6, 1.44], 13).setMaxBounds(bounds);
    this.controlService.OSM.addTo(mymap);

    this.opendataService.getSubways().subscribe((data: any) => {
      data.records.forEach((mydata: any) => {
        const nomStation = mydata.record.fields.nom,
          nomLigne = mydata.record.fields.ligne;
        L.marker(
          // tslint:disable-next-line:max-line-length
          [mydata.record.fields.geo_shape.geometry.coordinates[1], mydata.record.fields.geo_shape.geometry.coordinates[0]],
          { icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol('subway')) }
        )
          .addTo(mymap)
          .bindPopup(`${nomStation} (ligne ${nomLigne} )`);
      });
    });

    this.opendataService.getBikes().subscribe((data: any) => {
      console.log(data);
      const markers = L.markerClusterGroup();
      data.forEach((mydata: any) => {
        if (mydata.status === 'OPEN') {
          const nomStation = mydata.name,
            veloDispo = mydata.available_bikes,
            emplacementVeloDispo = mydata.available_bike_stands;
          let bikeSymbol;
          if (veloDispo <= 0) {
            bikeSymbol = 'redBike';
          } else if (veloDispo < 3) {
            bikeSymbol = 'orangeBike';
          } else {
            bikeSymbol = 'greenBike';
          }
          markers.addLayer(
            L.marker(
              [mydata.position.lat, mydata.position.lng],
              { icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol(bikeSymbol)) }
            )
            // tslint:disable-next-line:max-line-length
            .bindPopup(`<b>${nomStation}</b><br /> Vélos disponibles: <b>${veloDispo}</b><br />Emplacements disponibles: <b>${emplacementVeloDispo}</b>`)
          );
        }
      });
      mymap.addLayer(markers);
    });

    const lcontrol = L.control.layers(this.controlService.getBaseLayers()).addTo(mymap);

  }
}
