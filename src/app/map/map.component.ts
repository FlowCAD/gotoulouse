import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { Subscription } from 'rxjs';

import { OpendataService } from '@app/shared/services/opendata.service';
import { MarkersService } from '@app/shared/services/markers.service';
import { ControlService } from '@app/shared/services/control.service';
import { DataService } from '@app/shared/services/data.service';
import { GeolocationService } from '@app/shared/services/geolocation.service';
import { Place, EnumGenres } from '@app/shared/interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public static readonly SCALE_VALUE_MINZOOM: number = 12;
  public static readonly SCALE_VALUE_MAXZOOM: number = 18;

  public mymap: L.Map;
  public lcontrol: L.Control;
  public places: Place[];
  public enumGenres = EnumGenres;
  public locationMarker: L.Marker;

  private placesSubscription: Subscription;
  private subwaySubscription: Subscription;
  private bikeSubscription: Subscription;

  constructor(
    private opendataService: OpendataService,
    private markersService: MarkersService,
    private controlService: ControlService,
    private dataService: DataService,
    private geolocationService: GeolocationService
  ) {
    this.controlService.listen().subscribe((baseLayer: L.TileLayer) => {
      this.setBaseLayer(baseLayer);
    });

    this.geolocationService.listen().subscribe((loc: L.LocationEvent) => {
      this.flyTo(loc.latlng, MapComponent.SCALE_VALUE_MAXZOOM);
    });
  }

  ngOnInit() {
    this.setMapParam();
    this.setBaseLayer(this.controlService.OSM);
    this.getDatas();
  }

  ngAfterViewInit() {
    this.onGeoloc();
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
    this.bikeSubscription.unsubscribe();
    this.subwaySubscription.unsubscribe();
  }

  private setBaseLayer(myLayer: L.TileLayer) {
    let notLoaded = true,
      myKey = null;

    if (this.mymap._layers) {
      console.log('this.mymap._layers: ', this.mymap._layers);
      for (let lay in this.mymap._layers) {
        if (this.mymap._layers[lay]._url === layer._url) {
          myKey = lay;
          notLoaded = false;
          break;
        }
      }
      if (!notLoaded) {
        this.mymap.removeLayer(this.mymap._layers[myKey]);
      }
    }
    layer.addTo(this.mymap);

    // this.mymap.eachLayer((layer: L.Layer) => {
    //   console.log('layer: ', layer);
    // });
  }

  private onGeoloc() {
    this.mymap.on('locationfound', (e: L.LocationEvent) => this.setGeolocateMarker(e));
    this.mymap.on('locationerror', this.onLocationError);
  }

  private setGeolocateMarker(e: L.LocationEvent) {
    this.geolocationService.location = e;
    if (this.locationMarker) {
      this.mymap.removeLayer(this.locationMarker);
    } else {
      this.flyTo(e.latlng, MapComponent.SCALE_VALUE_MAXZOOM);
    }
    let radius: number;
    radius = e.accuracy / 2;
    this.locationMarker = L.marker(e.latlng, {
      icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol('here'))
    });
    this.locationMarker.addTo(this.mymap).bindPopup(`Vous êtes ici ! (à ${Math.round(radius)} mètres près)`);
  }

  private onLocationError(e: L.LocationEvent) {
    alert('Veuillez autoriser votre localisation svp =)');
  }

  private flyTo(coord: L.LatLngExpression, scale: number) {
    this.mymap.flyTo(coord, scale);
  }

  private setMapParam() {
    const bounds = L.latLngBounds(L.latLng(43.75, 1.76), L.latLng(43.43, 1.02));
    this.mymap = L.map('map', {
      minZoom: MapComponent.SCALE_VALUE_MINZOOM,
      maxZoom: MapComponent.SCALE_VALUE_MAXZOOM,
      zoomControl: false
    })
      .setView([43.6, 1.44], 13)
      .setMaxBounds(bounds)
      .locate({
        watch: true,
        timeout: 60000,
        enableHighAccuracy: true
      });
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
            placeVeloDispo = mydata.available_bike_stands,
            dateMAJ = new Date(mydata.last_update).toLocaleDateString(),
            heureMAJ = new Date(mydata.last_update).toLocaleTimeString(),
            bikeSymbol = this.getMarkerColor(veloDispo);
          markers.addLayer(
            L.marker([mydata.position.lat, mydata.position.lng], {
              icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol(bikeSymbol))
            }).bindPopup(this.getBikePopup(nomStation, veloDispo, placeVeloDispo, dateMAJ, heureMAJ))
          );
        }
      });
      this.mymap.addLayer(markers);
    });
  }

  private getMarkerColor(nbrVeloDispo: number) {
    let computedBikeSymbol: string;
    if (nbrVeloDispo === 0) {
      computedBikeSymbol = 'redBike';
    } else if (nbrVeloDispo <= 3) {
      computedBikeSymbol = 'orangeBike';
    } else {
      computedBikeSymbol = 'greenBike';
    }
    return computedBikeSymbol;
  }

  private getBikePopup(
    nomStation: string,
    veloDispo: string,
    placeVeloDispo: string,
    dateMAJ: string,
    heureMAJ: string
  ) {
    const bikePopup =
      `<b>${nomStation}</b><br />` +
      `Vélos disponibles: <b style="color:${this.getColor(veloDispo)};">${veloDispo}</b><br />` +
      `Emplacements disponibles: <b style="color:${this.getColor(placeVeloDispo)};">${placeVeloDispo}</b><br />` +
      `<i>Mis à jour à ${heureMAJ} le ${dateMAJ}</i>`;
    return bikePopup;
  }

  private getColor(data: string) {
    if (+data <= 3) {
      return 'red';
    } else {
      return 'black';
    }
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
          icon: L.AwesomeMarkers.icon(this.markersService.getMarkerSymbol(place.genre))
        })
          .addTo(this.mymap)
          .bindPopup(`<b>${place.nom}</b><br />${this.getGenreLibelle(place.genre)}`);
      });
      this.places = places;
    });
    this.dataService.emitPlaces();
  }

  private getGenreLibelle(genreId: string) {
    return this.enumGenres[genreId];
  }
}
