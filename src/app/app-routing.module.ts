import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MappageComponent } from './components/mappage/mappage.component';
import { AuthenticationGuard } from './authentication-guard.guard';
import { LoginComponent } from './components/admin-components/login/login.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { LineupPositionEditorComponent } from './components/admin-components/lineup-position-editor/lineup-position-editor.component';
import { AbilityLocationEditorComponent } from './components/admin-components/ability-location-editor/ability-location-editor.component';
import { LineupEditorComponent } from './components/admin-components/lineup-editor/lineup-editor.component'
import { AbilityLocationCreatorComponent } from './components/admin-components/ability-location-creator/ability-location-creator.component';

const routes: Routes = [
  // Public Routes
  {path: '', component:HomeComponent},
  {path: 'map/:map', component:MappageComponent},
  // Admin Routes
  {path: 'admin/login', component:LoginComponent},
  {path: 'admin', component:AdminComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin/map/:map/lineup-position', component:LineupPositionEditorComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin/map/:map/ability-location', component:AbilityLocationEditorComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin/map/:map/ability-location/create', component:AbilityLocationCreatorComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin/map/:map/lineups', component: LineupEditorComponent, canActivate: [AuthenticationGuard]},
  // 404
  {path: '**', component:PagenotfoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
