import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'src/app/services/http.service';
import { MAPS, API_ENDPOINT } from 'src/app/config/constants';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ability-location-editor',
  templateUrl: './ability-location-editor.component.html',
  styleUrls: ['./ability-location-editor.component.css'],
  providers: [ApiHttpService]
})
export class AbilityLocationEditorComponent {
  
  public updateForm: FormGroup;
  map: string;
  mapName: string;
  locations: any;
  lineups: any;
  xCoordinate: number;
  yCoordinate: number;
  clicked: boolean = false;
  updateSuccess: boolean = false;
  updateMessage: string;
  errorMessage: string;
  updateError: boolean = false;
  result: any;

  selectedAbility: string = 'snake-bite';

  constructor(
    private api: ApiHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) { 
      this.updateForm = this.fb.group({
        name:'',
        ability:'',
        positionx:'',
        positiony:''
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
        let url = API_ENDPOINT + '/api/abilityLocations/' + this.map;
        this.api.get(url).subscribe(data => {
          this.locations = data;
          console.log(this.locations);
        })
        // Load lineups from database
        url = API_ENDPOINT + '/api/lineups/' + this.map;
        this.api.get(url).subscribe(data => {
        this.lineups = data;
        });
      }
    )}

  mapClicked(e: any) {
    this.xCoordinate = e.offsetX;
    this.yCoordinate = e.offsetY;
    this.clicked = true;
  }

  clearCoordinates() {
    this.xCoordinate = 0;
    this.yCoordinate = 0;
    this.clicked = false;
    this.updateForm.reset();
    this.updateError = false;
    this.updateSuccess = false;
  }

  attemptUpdate(locationID: any){
    this.updateSuccess = false;
    //Check for empty values
    if (!this.updateForm.get('name').value && !this.updateForm.get('ability').value && !this.clicked) {
      this.errorMessage = "Error! All values were empty during submission! Enter in a value and try again.";
      this.updateError = true;
      return;
    }
    //Attempt update submission
    var formData:any = {};
    if (this.updateForm.get('name').value) {
      formData.name = this.updateForm.get('name').value;
    }
    if (this.updateForm.get('ability').value) {
      formData.ability = this.updateForm.get('ability').value
    }
    if (this.clicked) {
      formData.positionx = this.xCoordinate;
      formData.positiony = this.yCoordinate;
    }
    var url = API_ENDPOINT + '/api/abilityLocations/' + locationID;
    this.api.patch(url, formData).subscribe(result => {
        this.result = result;
        if (this.result.hasOwnProperty('error')) {
          this.errorMessage = "Error! Failed to update ability location.";
          this.updateError = true;
        }
        else {
          this.updateMessage = 'Ability location updated successfully! The page needs to be refreshed for changes to show up.'
          this.updateSuccess = true;
        }
      });
  }

  attemptDeletion(locationID: any) {
    if (confirm('Are you sure you want to delete this ability location?')) {
      var url = API_ENDPOINT + '/api/abilityLocations/' + locationID;
      this.api.delete(url).subscribe(result => {
        this.result = result;
        if (this.result != null) {
          this.errorMessage = "Error! Failed to delete ability location. Ability location may not exist.";
          this.updateError = true;
        }
        else {
          // Delete any lineups associated with the deleted ability location
          let lineupList = this.lineups;
          let abilityLocation = locationID;
          var url = '';
          lineupList = lineupList.filter(function(el: any) {
            return (el.abilityLocation === abilityLocation);
          });
          lineupList.forEach((lineup: any, index: any) => {
            url = API_ENDPOINT + '/api/lineups/' + lineup._id;
            this.api.delete(url).subscribe(result => {
              this.result = result;
              if (this.result != null) {
                this.errorMessage = "Error! Failed to delete lineup. Lineup may not exist.";
                this.updateError = true;
              }
            });
          });
          this.updateMessage = 'Ability location and related lineups deleted successfully! The page needs to be refreshed for changes to show up.'
          this.updateSuccess = true;
          this.updateError = false;
        }
      });
    }
  }

  setAbility(ability: string) {
    this.selectedAbility = ability;
  }

  abilityDisplay(id: string, ability: string) {
    if (ability === this.selectedAbility) {
      return true;
    }
    return false;
  }
}
