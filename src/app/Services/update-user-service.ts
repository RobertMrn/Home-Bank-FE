import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login-service";

@Injectable({providedIn: 'root'})
export class UpdateUserService {

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  updateUser(formBuilder: FormGroup){
    return this.http.put('http://localhost:8080/updateUser',{
      userId:JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2],
      email: formBuilder.get('email')?.value,
      firstName: formBuilder.get('firstName')?.value,
      lastName: formBuilder.get('lastName')?.value,
      phoneNumber: formBuilder.get('phoneNumber')?.value,
      gender: formBuilder.get('gender')?.value,
      address: formBuilder.get('address')?.value,
      nationality: formBuilder.get('nationality')?.value,
      birthDate: formBuilder.get('birthDate')?.value,
      personalUniqueCode: formBuilder.get('personalUniqueCode')?.value
    })
  }
}
