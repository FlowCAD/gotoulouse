import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  // tslint:disable-next-line:max-line-length
  private mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>';
  // tslint:disable-next-line:max-line-length
  private mbUrlBase = 'https://api.tiles.mapbox.com/v4/';
  private osmAttr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  private osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private osmHotUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

  public get OSM(): any {
    return L.tileLayer(this.osmUrl, { attribution: this.osmAttr});
  }

  public get OSMHot(): any {
    return L.tileLayer(this.osmHotUrl, { attribution: this.osmAttr});
  }

  public getMBGrey(mbKey: any): any {
    return L.tileLayer(
      this.getMbUrl('mapbox.light', mbKey),
      { attribution: this.mbAttr }
    );
  }

  public getMBSat(mbKey: any): any {
    return L.tileLayer(
      this.getMbUrl('mapbox.satellite', mbKey),
      { attribution: this.mbAttr }
    );
  }

  public getMBStreets(mbKey: any): any {
    return L.tileLayer(
      this.getMbUrl('mapbox.streets', mbKey),
      { attribution: this.mbAttr }
    );
  }

  public getBaseLayers(mbKey: any) {
    const baseMaps = {
      'OpenStreetMap': this.OSM,
      'OSM Hot': this.OSMHot,
      'Plan gris': this.getMBGrey(mbKey),
      'Plan': this.getMBStreets(mbKey),
      'Satellite': this.getMBSat(mbKey)
    };
    return baseMaps;
  }

  // private get mbToken() {
  //   return 'pk.eyJ1IjoiZmxvcmlhbmNhZG96IiwiYSI6ImNqMGkzN3ZzYzAwM3MzMm80MDZ6eGQ2bmwifQ.BMmvDcBnXoWT8waOnIKNBg';
  // }

  private getMbUrl(id: string, mbKey: any) {
    return this.mbUrlBase + id + '/{z}/{x}/{y}.png?access_token=' + mbKey;
    // return this.mbUrlBase + id + '/{z}/{x}/{y}.png?access_token=' + this.mbToken;
  }
}
