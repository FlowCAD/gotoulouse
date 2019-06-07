import { Title } from '@angular/platform-browser';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

import { AuthenticationService, I18nService } from '@app/core';

import * as L from 'leaflet';

import { GeolocationService } from '@app/shared/services/geolocation.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @Output()
  locateUser: EventEmitter<L.LocationEvent> = new EventEmitter();

  layers: {}[] = [
    { value: 'OSM', viewValue: 'Open Street Map' },
    { value: 'OSMHot', viewValue: 'Open Street Map Hot' },
    { value: 'PlanGris', viewValue: 'Plan Gris' },
    { value: 'Plan', viewValue: 'Plan' },
    { value: 'Sat', viewValue: 'Vue Satellite' }
  ];

  constructor(
    private router: Router,
    private titleService: Title,
    private media: ObservableMedia,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  public geolocateMe(): void {
    this.geolocationService.locate();
  }

  public changeBackgroundLayer(layer: string): void {
    console.log('Layer choosen: ', layer);
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
