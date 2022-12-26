import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}


  public uploadImage(url: string, parameters: any, image: File, options?: any) {
    let fileName:string = parameters.id;
    let fileExtension:string = image.name.split('?')[0].split('.').pop();

    const formData = new FormData();
    
    formData.append('file', image, fileName+'.'+fileExtension);

    return this.http.post(url, formData, {headers: options});
  }
}
