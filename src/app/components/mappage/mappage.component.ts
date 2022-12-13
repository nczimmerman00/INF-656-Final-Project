import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-mappage',
  templateUrl: './mappage.component.html',
  styleUrls: ['./mappage.component.css']
})

export class MappageComponent implements OnInit {
  
  map: string;
  mapName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        const validMaps = ['ascent', 'bind', 'breeze', 'fracture', 'haven', 'icebox', 'pearl', 'split'];
        this.map = this.route.snapshot.paramMap.get('map');
        this.mapName = this.map.charAt(0).toUpperCase() + this.map.slice(1);
        if (!(validMaps.includes(this.map))) {
          this.router.navigate(['/404']);
        }
      }
    )}

    testFunction(e: any) {
      console.log(e.offsetX + "\t" + e.offsetY);
    }
}