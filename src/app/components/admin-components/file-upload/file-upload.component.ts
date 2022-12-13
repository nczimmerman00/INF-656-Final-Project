import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  
    selectedFile: File;
   
    constructor(
      private http: HttpClient,
      ) { }

    ngOnInit(): void {
    }
  
    // On file Select
    onFileChanged(event: any) {
        this.selectedFile = event.target.files[0];
    }
  
    // OnClick of button Upload
    onUpload() {
        // this.http is the injected HttpClient
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        this.http.post('my-backend.com/file-upload', uploadData).subscribe(event => {
        console.log(event); // handle event here
    });
      
    }
}