import { Component } from '@angular/core';
import { MAPS } from 'src/app/config/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  MAPS: any = MAPS
}
