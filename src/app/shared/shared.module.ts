import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from '@app/shared/loader/loader.component';

import { KeysService } from '@app/shared/services/keys.service';
import { OpendataService } from '@app/shared/services/opendata.service';
import { MarkersService } from '@app/shared/services/markers.service';
import { ControlService } from '@app/shared/services/control.service';
import { DataService } from '@app/shared/services/data.service';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule, HttpClientModule],
  declarations: [LoaderComponent],
  providers: [
    KeysService,
    OpendataService,
    MarkersService,
    ControlService,
    DataService
  ],
  exports: [LoaderComponent]
})
export class SharedModule {}
