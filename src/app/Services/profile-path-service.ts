import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PhotoProfilePath} from "../profile-page/profile-page.component";
import {LoginService} from "./login-service";

export interface DataRecognitionResponse {
  text: string;
}

@Injectable({providedIn: 'root'})
export class PhotoProfilePathService {

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  addPhotoProfile(fileReader: string) {
    return this.http.post<PhotoProfilePath>('http://localhost:8080/addPhotoProfile', {
      userId: JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2],
      path: fileReader
    });
  }

  getPhotoProfilePath() {
    let requestParams = new HttpParams();
    requestParams = requestParams.set('userId', JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2]);
    return this.http.get<PhotoProfilePath>('http://localhost:8080/getPhotoPath', {
      params: requestParams
    })
  }

  getDataFromPhoto(fileReader: string) {
    return this.http.post<DataRecognitionResponse>('http://localhost:8080/getTextFromFile', {
      recognisedText: fileReader
    })
  }

}
