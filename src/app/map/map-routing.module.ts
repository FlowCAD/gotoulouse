import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { MapComponent } from '@app/map/map.component';

const routes: Routes = [
  Route.withShell([
    { path: 'map', component: MapComponent, data: { title: extract('Map') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MapRoutingModule { }
