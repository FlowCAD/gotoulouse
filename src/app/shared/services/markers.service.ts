import { Injectable } from '@angular/core';
import { MarkerSymbol } from '@app/shared/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  public getMarkerSymbol(markerType: string): Object {
    switch (markerType) {
      case 'home':
        return this.createFA(' fa fa-home', 'green', 'white');
      case 'here':
        return this.createFA(' fa fa-street-view', 'orange', 'white');
      case 'subway':
        return this.createFA(' fa fa-subway', 'darkblue', 'rgba(255,255,255,0.6)');
      case 'greenBike':
        return this.createFA(' fa-bicycle', 'green', 'white');
      case 'orangeBike':
        return this.createFA(' fa-bicycle', 'orange', 'white');
      case 'redBike':
        return this.createFA(' fa-bicycle', 'red', 'white');
      case 'MAGASIN':
        return this.createFA(' fa fa-shopping-basket', 'green', 'white');
      case 'RESTAURANT':
        return this.createFA(' fa fa-cutlery', 'purple', 'white');
      case 'CAFE':
        return this.createFA(' fa fa-coffee', 'cadetblue', 'white');
      case 'BAR':
        return this.createFA(' fa fa-beer', 'darkred', 'white');
      case 'BOITE':
        return this.createFA(' fa fa-glass', 'red', 'white');
      case 'alert':
      default:
        return this.createFA(' fa fa-exclamation', 'orange', 'white');
    }
  }

  private createFA(icon: string, markerColor: string, iconColor: string): MarkerSymbol {
    return new MarkerSymbol(icon, 'fa', markerColor, iconColor);
  }
}
