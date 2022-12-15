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

  public updateForm: FormGroup;
  map: string;
  mapName: string;
  abilityLocations: any;
  lineupLocations: any;
  lineups: any;

  selectedAbilityLocation: string = 'none';
  selected: boolean = false;
  selectedLineupLocation: string = 'none';
 
  selectedLineup: string;
  lineupName: string;
  lineupSide: string;
  lineupThrowType: string;

  updateMessage: string;
  errorMessage: string;
  updateSuccess: boolean = false;
  updateError: boolean = false;
  result: any;

  constructor(
    private api: ApiHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.updateForm = this.fb.group({
      name:'',
      side:'',
      throwType:''
    });
  }

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

    // Returns true if ability location should be displayed, false otherwise
    abilityDisplay(id: string) {
      if (this.selected) {
        if (id === this.selectedAbilityLocation) {
          return true;
        }
        return false;
      }
      return true;
    }

    // Returns true if lineup location should be displayed, false otherwise
    lineupDisplay(id: string) {
      if (this.selected) {
        let lineupList = this.lineups;
        let abilityLocation = this.selectedAbilityLocation;
        lineupList = lineupList.filter(function(el: any) {
          return (el.abilityLocation === abilityLocation && el.lineupLocation === id)
        });
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
      this.lineupSide = lineupList[0].side;
      this.lineupThrowType = lineupList[0].throwType;

      // Reset update form
      this.updateForm.reset();
    }
    
    attemptUpdate(){
      this.updateSuccess = false;
      //Check for empty values
      if (!this.updateForm.get('name').value && !this.updateForm.get('side').value && !this.updateForm.get('throwType').value) {
        this.errorMessage = "Error! All values were empty during submission! Enter in a value and try again.";
        this.updateError = true;
        return;
      }
      //Attempt update submission
      var formData:any = {};
      if (this.updateForm.get('name').value) {
        formData.name = this.updateForm.get('name').value;
      }
      if (this.updateForm.get('side').value) {
        formData.ability = this.updateForm.get('side').value;
      }
      if (this.updateForm.get('throwType').value) {
        formData.throwType = this.updateForm.get('throwType').value;
      }
      var url = 'http://localhost:8080/api/lineups/' + this.selectedLineup;
      this.api.patch(url, formData).subscribe(result => {
          this.result = result;
          if (this.result.hasOwnProperty('error')) {
            this.errorMessage = "Error! Failed to update lineup.";
            this.updateError = true;
          }
          else {
            this.updateMessage = 'Lineup updated successfully! The page needs to be refreshed for changes to show up.'
            this.updateSuccess = true;
          }
        });
    }

    attemptDeletion() {
      if (confirm('Are you sure you want to delete this lineup?')) {
        var url = 'http://localhost:8080/api/lineups/' + this.selectedLineup;
        this.api.delete(url).subscribe(result => {
          this.result = result;
          if (this.result != null) {
            this.errorMessage = "Error! Failed to delete lineup. Lineup may not exist.";
            this.updateError = true;
          }
          else {
            this.updateMessage = 'Lineup deleted successfully! The page needs to be refreshed for changes to show up.'
            this.updateSuccess = true;
            this.updateError = false;
          }
        });
      }
    }
}
