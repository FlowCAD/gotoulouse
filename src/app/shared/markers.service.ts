import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  public getMarkerSymbol(markerType: string): Object {
    switch (markerType) {
      case "home":
        return {icon: ' fa fa-home', prefix: 'fa', color: 'green', iconColor: 'white'};
      case "here":
        return {icon: ' fa fa-street-view', prefix: 'fa', color: 'orange', iconColor: 'white'};
      case "subway":
        return {icon: ' fa fa-subway', prefix: 'fa', color: 'blue', iconColor: 'white'};
      case "bike":
        return { icon: 'fa-bicycle', prefix: 'fa', markerColor: 'darkpurple', iconColor: 'white' };
      case "work":
        return {icon: ' fa fa-briefcase', prefix: 'fa', color: 'darkblue', iconColor: 'white'};
      case "shop":
        return {icon: ' fa fa-shopping-basket', prefix: 'fa', color: 'green', iconColor: 'white'};
      case "resto":
        return {icon: ' fa fa-cutlery', prefix: 'fa', color: 'purple', iconColor: 'white'};
      case "coffee":
        return {icon: ' fa fa-coffee', prefix: 'fa', color: 'cadetblue', iconColor: 'white'};
      case "bar":
        return {icon: ' fa fa-beer', prefix: 'fa', color: 'darkred', iconColor: 'white'};
      case "club":
        return {icon: ' fa fa-glass', prefix: 'fa', color: 'red', iconColor: 'white'};
      case "alert":
      default:
        return {icon: ' fa fa-exclamation', prefix: 'fa', color: 'orange', iconColor: 'white'};
    }
  };
}