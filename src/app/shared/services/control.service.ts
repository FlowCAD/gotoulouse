import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private baseLayerObject: L.TileLayer;
  private baseLayerSubject = new Subject<L.TileLayer>();

  private mbAttr =
    'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>';
  private mbUrlBase = 'https://api.tiles.mapbox.com/v4/';
  private osmAttr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  private osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private osmHotUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

  public listen(): Observable<L.TileLayer> {
    return this.baseLayerSubject.asObservable();
  }

  public changeLayer(layer: string) {
    switch (layer) {
      case 'OSM':
        this.baseLayerObject = this.OSM;
        break;
      case 'OSMHot':
        this.baseLayerObject = this.OSMHot;
        break;
      case 'Plan':
        this.baseLayerObject = this.MBStreets;
        break;
      case 'Sat':
        this.baseLayerObject = this.MBSat;
        break;
      default:
        this.baseLayerObject = this.OSM;
        break;
    }
    this.baseLayerSubject.next(this.baseLayerObject);
  }

  private get mbToken() {
    return 'pk.eyJ1IjoiZmxvcmlhbmNhZG96IiwiYSI6ImNqMGkzN3ZzYzAwM3MzMm80MDZ6eGQ2bmwifQ.BMmvDcBnXoWT8waOnIKNBg';
  }

  private getMbUrl(id: string) {
    return this.mbUrlBase + id + '/{z}/{x}/{y}.png?access_token=' + this.mbToken;
  }

  public get OSM(): any {
    return L.tileLayer(this.osmUrl, { attribution: this.osmAttr });
  }

  public get OSMHot(): any {
    return L.tileLayer(this.osmHotUrl, { attribution: this.osmAttr });
  }

  public get MBSat(): any {
    return L.tileLayer(this.getMbUrl('mapbox.satellite'), { attribution: this.mbAttr });
  }

  public get MBStreets(): any {
    return L.tileLayer(this.getMbUrl('mapbox.streets'), { attribution: this.mbAttr });
  }
}
