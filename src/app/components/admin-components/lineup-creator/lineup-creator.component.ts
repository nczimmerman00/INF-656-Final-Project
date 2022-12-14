import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiHttpService } from 'src/app/services/http.service';
import { ImageUploadService } from 'src/app/services/image-upload.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAPS } from 'src/app/config/constants';

@Component({
  selector: 'app-lineup-creator',
  templateUrl: './lineup-creator.component.html',
  styleUrls: ['./lineup-creator.component.css'],
  providers: [ApiHttpService]
})
export class LineupCreatorComponent {

  public submissionForm: FormGroup;
  map: string;
  mapName: string;
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
}
