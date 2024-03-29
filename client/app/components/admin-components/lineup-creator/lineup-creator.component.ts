import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'client/app/services/http.service';
import { ImageUploadService } from 'client/app/services/image-upload.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAPS, API_ENDPOINT } from 'client/app/config/constants';

@Component({
  selector: 'app-lineup-creator',
  templateUrl: './lineup-creator.component.html',
  styleUrls: ['./lineup-creator.component.css'],
  providers: [ApiHttpService]
})
export class LineupCreatorComponent {

  public submissionForm: FormGroup;
  fileToUpload: File | null = null;
  map: string;
  mapName: string;
  abilityLocations: any;
  lineupLocations: any;
  selectedAbilityLocation: string;
  selectedAbilityLocationName: string = 'None';
  selectedAbility: string;
  selectedLineupLocation: string;
  selectedLineupLocationName: string = 'None';
  submissionSuccess: boolean = false;
  submissionError: boolean = false;
  errorMessage: string;
  result: any = {};
  selectedSearchAbility: string = 'snake-bite';


  constructor(
    private api: ApiHttpService,
    private imageAPI: ImageUploadService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) { 
      this.submissionForm = this.fb.group({
        lineupName:'',
        side:'',
        throwType:'',
      });
     }
  
  ngOnInit() {
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
        })
        // Load lineup locations from database
        url = API_ENDPOINT + '/api/lineupLocations/' + this.map;
        this.api.get(url).subscribe(data => {
          this.lineupLocations = data;
        })
      }
    )}

    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }
    
  attemptSubmission() {
    this.submissionSuccess = false;
    // Check for empty values
    
    if (this.fileToUpload == null || !this.submissionForm.get('lineupName').value || 
        !this.submissionForm.get('side').value || !this.submissionForm.get('throwType').value ||
        !this.selectedAbilityLocation || !this.selectedLineupLocation) {
      this.errorMessage = "Error! A value was empty during submission! Check all values and try again.";
      this.submissionError = true;
      return;
    }
    //Submit data to the mongodb server
    var data = {"name": this.submissionForm.get('lineupName').value, 
              'side': this.submissionForm.get('side').value,
              'ability': this.selectedAbility,
              'throwType': this.submissionForm.get('throwType').value,
              'abilityLocation': this.selectedAbilityLocation,
              'lineupLocation': this.selectedLineupLocation,
              'map': this.map
            };
    console.log(data);
                
    this.api.post(API_ENDPOINT + '/api/lineups', data).subscribe(result => {
      this.result = result;
      if (this.result.hasOwnProperty('error')) {
        console.log(this.result)
        this.errorMessage = "Error! Name already taken!";
        this.submissionError = true;
      }
      else {
        // Upload image
        var newID = this.result._id;
        this.imageAPI.uploadImage(API_ENDPOINT + '/images/upload', 
          {"classification": "lineup", "id": newID}, 
          this.fileToUpload!).subscribe(result => {
            if (this.result.hasOwnProperty('error')) {
              this.errorMessage = "Error! Image failed to upload.";
              this.submissionError = true;
            }
            else {
              this.submissionError = false;
              this.submissionSuccess = true;
              // Reset form
              this.submissionForm.reset();
              this.selectedAbilityLocation = null;
              this.selectedLineupLocation = null;
            }
          })
          
      }
    });
  }

    selectAbilityLocation(id: string, name: string, ability: string) {
      this.selectedAbilityLocation = id;
      this.selectedAbilityLocationName = name;
      this.selectedAbility = ability;
    }

    selectLineupLocation(id: string, name: string) {
      this.selectedLineupLocation = id;
      this.selectedLineupLocationName = name;
    }

    setAbility(ability: string) {
      this.selectedSearchAbility = ability;
    }
  
    abilityDisplay(id: string, ability: string) {
      if (ability === this.selectedSearchAbility) {
        return true;
      }
      return false;
    }
}
