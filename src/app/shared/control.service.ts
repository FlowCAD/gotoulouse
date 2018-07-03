import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>';
  private mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=XXXXXXXX';
  private osmAttr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  private osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 

  public get OSM() : any {
    return L.tileLayer(this.osmUrl, { attribution: this.osmAttr});
  }
  
  public get MBGrey() : any {
    return L.tileLayer(this.mbUrl, { id: 'mapbox.light', attribution: this.mbAttr });
  }

  public get MBSat() : any {
    return L.tileLayer(this.mbUrl, { id: 'mapbox.satellite', attribution: this.mbAttr });
  }
    
  public get MBStreets() : any {
    return L.tileLayer(this.mbUrl, { id: 'mapbox.streets', attribution: this.mbAttr });
  }
    
  public getBaseLayers() {
    const baseMaps = {
      "OpenStreetMap": this.OSM,
      "Plan gris": this.MBGrey,
      "Plan": this.MBStreets,
      "Satellite": this.MBSat
    };

    return baseMaps;
  }
}
