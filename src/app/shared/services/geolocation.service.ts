import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private locationObject: L.LocationEvent;
  private locationSubject = new Subject<L.LocationEvent>();

  public listen(): Observable<L.LocationEvent> {
    return this.locationSubject.asObservable();
  }

  public locate() {
    this.locationSubject.next(this.locationObject);
  }

  public set location(e: L.LocationEvent) {
    this.locationObject = e;
  }

  public get location(): L.LocationEvent {
    return this.locationObject;
  }
}
