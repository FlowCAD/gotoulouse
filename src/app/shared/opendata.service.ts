import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpendataService {

  constructor(
    private http: HttpClient
  ) { }

  getSubways() {
    return this.http.get('https://data.toulouse-metropole.fr/api/v2/catalog/datasets/stations-de-metro/records?rows=100&pretty=true&timezone=UTC')
  }

  getBikes() {
    return this.http.get('https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=XXXXXXXX')
  }
}