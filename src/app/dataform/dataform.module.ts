import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@app/material.module';
import { DataFormRoutingModule } from '@app/dataform/dataform-routing.module';
import { DataFormComponent } from '@app/dataform/dataform.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    DataFormRoutingModule
  ],
  declarations: [
    DataFormComponent
  ]
})
export class DataFormModule { }
