import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'src/app/services/http.service';
import { ImageUploadService } from 'src/app/services/image-upload.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAPS } from 'src/app/config/constants';

@Component({
  selector: 'app-ability-location-creator',
  templateUrl: './ability-location-creator.component.html',
  styleUrls: ['./ability-location-creator.component.css'],
  providers: [ApiHttpService]
})
export class AbilityLocationCreatorComponent {

  public submissionForm: FormGroup;
  fileToUpload: File | null = null;
  map: string;
  mapName: string;
  xCoordinate: number;
  yCoordinate: number;
  clicked: boolean = false;
  submissionSuccess: boolean = false;
  submissionError: boolean = false;
  errorMessage: string;
  result: any = {};

  constructor(
    private api: ApiHttpService,
    private imageAPI: ImageUploadService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) { 
      this.submissionForm = this.fb.group({
        locationName:'',
        ability:'',
      });
     }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.map = this.route.snapshot.paramMap.get('map');
        this.mapName = this.map.charAt(0).toUpperCase() + this.map.slice(1);
        if (!(MAPS.includes(this.map))) {
          this.router.navigate(['/404']);
        }
      }
    )}

    mapClicked(e: any) {
      this.xCoordinate = e.offsetX;
      this.yCoordinate = e.offsetY;
      this.clicked = true;
    }

    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }

    attemptSubmission() {
      this.submissionSuccess = false;
      // Check for empty values
      if (this.fileToUpload == null || !this.submissionForm.get('ability').value || !this.clicked) {
        this.errorMessage = "Error! A value was empty during submission! Check all values and try again.";
        this.submissionError = true;
        return;
      }
      //Submit data to the mongodb server
      var data = {"name": this.submissionForm.get('locationName').value, 
                'ability': this.submissionForm.get('ability').value,
                'positionx': this.xCoordinate,
                'positiony': this.yCoordinate,
                'map': this.map};
                  
      this.api.post('http://localhost:8080/api/abilityLocations', data).subscribe(result => {
        this.result = result;
        if (this.result.hasOwnProperty('error')) {
          console.log(this.result);
          this.errorMessage = "Error! Name already taken!";
          this.submissionError = true;
        }
        else {
          // Upload image
          var newID = this.result._id;
          this.imageAPI.uploadImage('http://localhost:8080/images/upload', 
            {"classification": "abilityLocation", "id": newID}, 
            this.fileToUpload!).subscribe(result => {
              if (this.result.hasOwnProperty('error')) {
                this.errorMessage = "Error! Image failed to upload.";
                this.submissionError = true;
              }
              else {
                this.submissionError = false;
                this.submissionSuccess = true;
              }
            })
            
        }
      });
    }
  
}
    

