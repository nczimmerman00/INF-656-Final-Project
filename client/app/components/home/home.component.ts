import { Component } from '@angular/core';
import { MAPS } from 'client/app/config/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  MAPS: any = MAPS
}
