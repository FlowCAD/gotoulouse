import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpendataService {

  constructor(
    private http: HttpClient
  ) { }

  public getSubways() {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://data.toulouse-metropole.fr/api/v2/catalog/datasets/stations-de-metro/records?rows=100&pretty=true&timezone=UTC');
  }

  public getBikes() {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=64e3d20424d8454667fc5a996957393761019f86');
  }
}
