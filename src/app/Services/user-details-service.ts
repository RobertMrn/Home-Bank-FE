import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {TableElements} from "../home-admin/home-admin.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface UserDetailsResponse {
  userId: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  gender: string,
  address: string,
  nationality: string,
  birthDate: Date,
  iban: string,
  familySituation: string,
  occupation: string,
  employmentStartDate: Date,
  monthlyIncome: number
}

export interface AddUserResponse {
  userId: string,
}


@Injectable({providedIn: 'root'})
export class UserDetailsService {
  requestParams = new HttpParams();
  data: UserDetailsResponse | undefined;
  isFileSelected = false;
  isFileRefused = false;



  constructor(private http: HttpClient, private route: Router,private formBuilder: FormBuilder) {
  }
  public autoCompleteForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    address: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    town: ['', [Validators.required]],
    nationality: ['', [Validators.required]]
  })


  getUserDetails(contractId: string) {
    this.requestParams = this.requestParams.set('contractId', contractId);
    return this.http.get<UserDetailsResponse>('http://localhost:8080/findUserDataAndConsumerDataByUserId', {
      params: this.requestParams
    }).pipe(catchError(errorResponse => {
        return throwError(() => new Error(errorResponse));
      }), tap(resData => {
        this.data = resData;
        this.route.navigate(['userDetails']);
      })
    )
  }

  getAllUsers() {
    return this.http.get<TableElements[]>('http://localhost:8080/findAllUsersExceptAdmin')
  }

  addUser(form: FormGroup) {
    return this.http.post<AddUserResponse>('http://localhost:8080/addUser', {
      email: form.get('email')?.value as string,
      firstName: form.get('firstName')?.value as string,
      lastName: form.get('lastName')?.value as string,
      phoneNumber: form.get('phoneNumber')?.value as string,
      gender: form.get('gender')?.value as string,
      address: form.get('address')?.value as string,
      nationality: form.get('nationality')?.value as string,
      birthDate: form.get('birthDate')?.value as Date,
      personalUniqueCode: form.get('personalUniqueCode')?.value as string,
      hashedPassword: form.get('hashedPassword')?.value as string
    }).pipe(catchError(errorResponse => {
      return throwError(() => new Error('Could not add the user'));
    }))
  }

  addUserRole(userId: number, role: string) {
    return this.http.post('http://localhost:8080/addUserRole', {
      userId: userId,
      role: role
    }).pipe(catchError(errorResponse => {
      return throwError(() => new Error('Could not add the user'));
    }))
  }

  deleteUser(userId:number){
    this.requestParams = this.requestParams.set('userId', userId);
    return this.http.delete('http://localhost:8080/deleteUserById', {
      params: this.requestParams
    }).pipe(catchError(errorResponse => {
      return throwError(() => new Error('Could not delete the user'));
    }))
  }


}
