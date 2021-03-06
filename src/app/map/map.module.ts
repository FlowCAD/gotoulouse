import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@app/material.module';
import { MapRoutingModule } from '@app/map/map-routing.module';
import { MapComponent } from '@app/map/map.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, HttpClientModule, MaterialModule, MapRoutingModule],
  declarations: [MapComponent]
})
export class MapModule {}
