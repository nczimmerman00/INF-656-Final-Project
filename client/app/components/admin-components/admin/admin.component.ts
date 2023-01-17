import { Component } from '@angular/core';
import { MAPS } from 'client/app/config/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  MAPS: any = MAPS
}
