import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { DataFormComponent } from '@app/dataform/dataform.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'dataform', component: DataFormComponent, data: { title: extract('Form') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DataFormRoutingModule { }
