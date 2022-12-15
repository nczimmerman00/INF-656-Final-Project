import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'src/app/services/http.service';
import { MAPS } from 'src/app/config/constants';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lineup-position-editor',
  templateUrl: './lineup-position-editor.component.html',
  styleUrls: ['./lineup-position-editor.component.css'],
  providers: [ApiHttpService]
})
export class LineupPositionEditorComponent {

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

  constructor(
    private api: ApiHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) { 
      this.updateForm = this.fb.group({
        name:'',
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
        // Load lineup locations from database
        let url = 'http://localhost:8080/api/lineupLocations/' + this.map;
        this.api.get(url).subscribe(data => {
          this.locations = data;
          console.log(this.locations);
        })
        // Load lineups from database
        url = 'http://localhost:8080/api/lineups/' + this.map;
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
    if (!this.updateForm.get('name').value && !this.clicked) {
      this.errorMessage = "Error! All values were empty during submission! Enter in a value and try again.";
      this.updateError = true;
      return;
    }
    //Attempt update submission
    var formData:any = {};
    if (this.updateForm.get('name').value) {
      formData.name = this.updateForm.get('name').value;
    }
    if (this.clicked) {
      formData.positionx = this.xCoordinate;
      formData.positiony = this.yCoordinate;
    }
    var url = 'http://localhost:8080/api/lineupLocations/' + locationID;
    this.api.patch(url, formData).subscribe(result => {
        this.result = result;
        if (this.result.hasOwnProperty('error')) {
          this.errorMessage = "Error! Failed to update lineup location.";
          this.updateError = true;
        }
        else {
          this.updateMessage = 'Lineup location updated successfully! The page needs to be refreshed for changes to show up.'
          this.updateSuccess = true;
        }
      });
  }

  attemptDeletion(locationID: any) {
    if (confirm('Are you sure you want to delete this lineup location?')) {
      var url = 'http://localhost:8080/api/lineupLocations/' + locationID;
      this.api.delete(url).subscribe(result => {
        this.result = result;
        if (this.result != null) {
          this.errorMessage = "Error! Failed to delete lineup location. Lineup location may not exist.";
          this.updateError = true;
        }
        else {
          // Delete any lineups associated with the deleted ability location
          let lineupList = this.lineups;
          let lineupLocation = locationID;
          var url = '';
          lineupList = lineupList.filter(function(el: any) {
            return (el.lineupLocation === lineupLocation);
          });
          lineupList.forEach((lineup: any, index: any) => {
            url = 'http://localhost:8080/api/lineups/' + lineup._id;
            this.api.delete(url).subscribe(result => {
              this.result = result;
              if (this.result != null) {
                this.errorMessage = "Error! Failed to delete lineup. Lineup may not exist.";
                this.updateError = true;
              }
            });
          });
          this.updateMessage = 'Lineup location and related lineups deleted successfully! The page needs to be refreshed for changes to show up.'
          this.updateSuccess = true;
          this.updateError = false;
        }
      });
    }
  }
}
