import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'src/app/services/http.service';
import { MAPS } from 'src/app/config/constants';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lineup-editor',
  templateUrl: './lineup-editor.component.html',
  styleUrls: ['./lineup-editor.component.css'],
  providers: [ApiHttpService]
})
export class LineupEditorComponent {

  map: string;
  mapName: string;
  abilityLocations: any;
  lineupLocations: any;
  lineups: any;

  constructor(
    private api: ApiHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // Get map name from URL
    this.route.queryParams.subscribe(params => {
        this.map = this.route.snapshot.paramMap.get('map');
        this.mapName = this.map.charAt(0).toUpperCase() + this.map.slice(1);
        if (!(MAPS.includes(this.map))) {
          this.router.navigate(['/404']);
        }
      // Load ability locations from database
      let url = 'http://localhost:8080/api/abilityLocations/' + this.map;
      this.api.get(url).subscribe(data => {
        this.abilityLocations = data;
      });
      // Load lineup locations from database
      url = 'http://localhost:8080/api/lineupLocations/' + this.map;
      this.api.get(url).subscribe(data => {
          this.lineupLocations = data;
        });
      // Load lineups from database
      url = 'http://localhost:8080/api/lineups/' + this.map;
      this.api.get(url).subscribe(data => {
        this.lineups = data;
      });
      }
    )}
}
