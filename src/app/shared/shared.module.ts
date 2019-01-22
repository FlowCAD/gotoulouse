import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from '@app/shared/loader/loader.component';

import { OpendataService } from '@app/shared/opendata.service';
import { MarkersService } from '@app/shared/markers.service';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent],
  providers: [
    OpendataService,
    MarkersService
  ],
  exports: [LoaderComponent]
})
export class SharedModule {}
