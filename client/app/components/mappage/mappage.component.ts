import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { MAPS, API_ENDPOINT } from 'client/app/config/constants';
import { ApiHttpService } from 'client/app/services/http.service';

@Component({
  selector: 'app-mappage',
  templateUrl: './mappage.component.html',
  styleUrls: ['./mappage.component.css'],
  providers: [ApiHttpService]
})

export class MappageComponent implements OnInit {
  
  map: string;
  mapName: string;

  abilityLocations: any;
  lineupLocations: any;
  lineups: any;

  selectedAbilityLocation: string;
  selected: boolean = false;
  selectedLineupLocation: string;
  selectedLineup: string;
  selectedAbility: string = 'snake-bite';
  selectedSide: string = 'both';

  lineupName: string;
  throwType: string;

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
        // Load ability locations from database
        let url = API_ENDPOINT + '/api/abilityLocations/' + this.map;
        this.api.get(url).subscribe(data => {
          this.abilityLocations = data;
        });
        // Load lineup locations from database
        url = API_ENDPOINT + '/api/lineupLocations/' + this.map;
        this.api.get(url).subscribe(data => {
            this.lineupLocations = data;
          });
        // Load lineups from database
        url = API_ENDPOINT + '/api/lineups/' + this.map;
        this.api.get(url).subscribe(data => {
          this.lineups = data;
          });
      }
    )}

    // Returns true if ability location should be displayed, false otherwise
    abilityDisplay(id: string, ability: string) {
      if (this.selected) {
        if (id === this.selectedAbilityLocation) {
          return true;
        }
        return false;
      }
      let lineupList = this.lineups;
      let abilityFilter = this.selectedAbility;
      let side = this.selectedSide;
      if (ability === this.selectedAbility && side === 'both') {
        return true;
      }
      else {
        lineupList = lineupList.filter(function(el: any) {
          return (el.ability === abilityFilter && el.side === side && el.abilityLocation === id)
        });
      }
      if (lineupList.length > 0) {
        return true;
      }
      return false;
    }

    // Returns true if lineup location should be displayed, false otherwise
    lineupDisplay(id: string) {
      if (this.selected) {
        let lineupList = this.lineups;
        let ability = this.selectedAbilityLocation;
        let side = this.selectedSide;
        if (side === 'both') {
          lineupList = lineupList.filter(function(el: any) {
            return (el.abilityLocation === ability && el.lineupLocation === id)
          });
        }
        else {
          lineupList = lineupList.filter(function(el: any) {
            return (el.abilityLocation === ability && el.side === side && el.lineupLocation === id)
          });
        }
        if (lineupList.length > 0) {
          return true;
        }
      }
      return false;
    }

    selectAbilityLocation(id: string) {
      if (this.selected) {
        this.selected = false;
      }
      else {
        this.selectedAbilityLocation = id; 
        this.selected = true;
      }
    }

    selectLineupLocation(id: string) {
      this.selectedLineupLocation = id;

      // Search for lineup by selected ability location and lineup location
      let abilityLocation = this.selectedAbilityLocation;
      let lineupLocation = this.selectedLineupLocation; 
      let lineupList = this.lineups;
      lineupList = lineupList.filter(function(el: any) {
        return (el.abilityLocation === abilityLocation && el.lineupLocation === lineupLocation)
      });
      this.selectedLineup = lineupList[0]._id;
      this.lineupName = lineupList[0].name;
      this.throwType = lineupList[0].throwType;
    }

    setAbility(ability: string) {
      this.selectedAbility = ability;
      this.selected = false;
    }

    setSide(side: string) {
      this.selectedSide = side;
      this.selected = false;
    }
}