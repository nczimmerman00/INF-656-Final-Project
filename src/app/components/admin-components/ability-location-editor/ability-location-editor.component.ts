import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'src/app/services/http.service';
import { MAPS } from 'src/app/config/constants';

@Component({
  selector: 'app-ability-location-editor',
  templateUrl: './ability-location-editor.component.html',
  styleUrls: ['./ability-location-editor.component.css'],
  providers: [ApiHttpService]
})
export class AbilityLocationEditorComponent {
  
  map: string;
  mapName: string;
  locations: Array<Object>;

  constructor(
    private api: ApiHttpService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  
  ngOnInit() {
    // Get map name from URL
    this.route.queryParams.subscribe(params => {
        this.map = this.route.snapshot.paramMap.get('map');
        this.mapName = this.map.charAt(0).toUpperCase() + this.map.slice(1);
        if (!(MAPS.includes(this.map))) {
          this.router.navigate(['/404']);
        }
    // Load ability locations from mongoose
    
      }
    )}
}
