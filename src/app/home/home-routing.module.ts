import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { HomeComponent } from '@app/home/home.component';
import { MapComponent } from '@app/map/map.component';
import { DataFormComponent } from '@app/dataform/dataform.component';
import { AboutComponent } from '@app/about/about.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: extract('Home') } },
    { path: 'map', component: MapComponent, data: { title: extract('Map') } },
    { path: 'dataform', component: DataFormComponent, data: { title: extract('Form') } },
    { path: 'about', component: AboutComponent, data: { title: extract('About') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {}
