import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DataFormComponent } from '@app/dataform/dataform.component';

const routes: Routes = [
  Route.withShell([
    { path: 'dataform', component: DataFormComponent, data: { title: extract('Form') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DataFormRoutingModule { }
