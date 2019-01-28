import { Component, OnInit, OnDestroy } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { Subscription } from 'rxjs';

import { KeysService } from '@app/shared/services/keys.service';
import { OpendataService } from '@app/shared/services/opendata.service';
import { MarkersService } from '@app/shared/services/markers.service';
import { ControlService } from '@app/shared/services/control.service';
import { DataService } from '@app/shared/services/data.service';
import { Place } from '@app/shared/interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  public mymap: any;
  public lcontrol: any;
  public mbKey: string;
  public mbKeySubscription: Subscription;
  public places: Place[];
  private placesSubscription: Subscription;
  private subwaySubscription: Subscription;
  private bikeSubscription: Subscription;

  constructor(
    public keyService: KeysService,
    private opendataService: OpendataService,
    private markersService: MarkersService,
    private controlService: ControlService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getKey();
    this.setMapParam();
    this.getDatas();
    this.lcontrol = L.control.layers(this.controlService.getBaseLayers(this.mbKey)).addTo(this.mymap);
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
    this.bikeSubscription.unsubscribe();
    this.subwaySubscription.unsubscribe();
  }

  public getKey() {
    this.keyService.getMbKeyFromServer();
    this.mbKeySubscription = this.keyService.mbKeySubject.subscribe( key => {
      this.mbKey = key;
    });
    this.keyService.emitMbKey();
  }

  private setMapParam() {
    const northEastBound = L.latLng(43.75, 1.76),
      southWestBound = L.latLng(43.43, 1.02),
      bounds = L.latLngBounds(northEastBound, southWestBound);
    this.mymap = L.map('map', { minZoom: 12, maxZoom: 18 })
      .setView([43.6, 1.44], 13)
      .setMaxBounds(bounds);
    this.controlService.OSM.addTo(this.mymap);
  }

  private getDatas() {
    this.getBikes();
    this.getSubways();
    this.getPlaces();
  }

  private getBikes() {
    this.bikeSubscription = this.opendataService.getBikes().subscribe((data: any) => {
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
            L.marker([mydata.position.lat, mydata.position.lng], {
              icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol(bikeSymbol))
            }).bindPopup(
              // tslint:disable-next-line:max-line-length
              `<b>${nomStation}</b><br /> Vélos disponibles: <b>${veloDispo}</b><br />Emplacements disponibles: <b>${emplacementVeloDispo}</b>`
            )
          );
        }
      });
      this.mymap.addLayer(markers);
    });
  }

  private getSubways() {
    this.subwaySubscription = this.opendataService.getSubways().subscribe((data: any) => {
      data.records.forEach((mydata: any) => {
        const nomStation = mydata.record.fields.nom,
          nomLigne = mydata.record.fields.ligne;
        L.marker(
          [
            mydata.record.fields.geo_shape.geometry.coordinates[1],
            mydata.record.fields.geo_shape.geometry.coordinates[0]
          ],
          { icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol('subway')) }
        )
          .addTo(this.mymap)
          .bindPopup(`${nomStation} (ligne ${nomLigne} )`);
      });
    });
  }

  private getPlaces() {
    this.dataService.getPlacesFormServer();
    this.placesSubscription = this.dataService.placesSubject.subscribe((places: Place[]) => {
      places.forEach(place => {
        L.marker([place.latitude, place.longitude], {
          icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol(place.genre.id))
        })
          .addTo(this.mymap)
          .bindPopup(place.nom);
      });
      this.places = places;
    });
    this.dataService.emitPlaces();
  }
}
