import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { database } from 'firebase';

import { Genre, Place } from '@app/shared/interface';

@Injectable()
export class DataService {
  public genres: Genre[] = [];
  public genresSubject = new Subject<Genre[]>();
  public places: Place[];
  public placesSubject = new Subject<Place[]>();

  constructor() {}

  public emitGenres() {
    this.genresSubject.next(this.genres);
  }

  public getGenresFromServer() {
    database()
      .ref('genres')
      .on('value', data => {
        this.genres = data.val() ? data.val() : [];
        this.emitGenres();
      });
  }

  public emitPlaces() {
    this.placesSubject.next(this.places);
  }

  public savePlacesToServer() {
    database()
      .ref('places')
      .set(this.places);
  }

  public getPlacesFormServer() {
    database()
      .ref('places')
      .on('value', data => {
        this.places = data.val() ? data.val() : [];
        this.emitPlaces();
      });
  }

  public addNewPlace(newPlace: Place) {
    this.places.push(newPlace);
    console.log('newPlace', newPlace);
    this.savePlacesToServer();
    this.emitPlaces();
  }
}
