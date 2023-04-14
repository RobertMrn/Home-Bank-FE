import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PersonalDataService} from "../Services/personal-data-service";
import {LoginService} from "../Services/login-service";
import {UpdateUserService} from "../Services/update-user-service";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {createWorker} from "tesseract.js";
import jwt_decode from "jwt-decode";
import {PhotoProfilePathService} from "../Services/profile-path-service";
import * as Tesseract from "tesseract.js";

export interface PhotoProfilePath {
  userId: number,
  path: string
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public personalDataService: PersonalDataService, private logInService: LoginService,
              private updateUserService: UpdateUserService, private location: Location, private http: HttpClient,
              private profilePathService: PhotoProfilePathService) {
  }

  worker: Tesseract.Worker = createWorker();
  fileReader = '';
  isSuccessful = false;
  isFailed = false;
  nationality: string[] = ['EU', 'RO', 'AF', 'AS', 'NA', 'SA', 'OC'];
  gender: string[] = ['MALE', 'FEMALE'];


  personalDataForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%=-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    phoneNumber: ['', [Validators.minLength(12), Validators.maxLength(12), Validators.required,
      Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{6})([-\s\.]?[0-9]{3,4})')]],
    gender: ['', [Validators.required]],
    address: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    birthDate: [new Date(), [Validators.required]],
    personalUniqueCode: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getProfileData();
    this.getPhotoProfilePath();
  }

  getProfileData() {
    this.personalDataService.getPersonalData(JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2]).subscribe({
      next: resData => {
        this.personalDataForm.setValue({
          email: resData.email,
          firstName: resData.firstName,
          lastName: resData.lastName,
          phoneNumber: resData.phoneNumber,
          gender: resData.gender,
          address: resData.address,
          nationality: resData.nationality,
          birthDate: resData.birthDate,
          personalUniqueCode: resData.personalUniqueCode
        })
      }
    });
  }

  onSubmit() {
    this.updateUserService.updateUser(this.personalDataForm).subscribe({
      next: value => {
        this.isSuccessful = true;
        setTimeout(() => {
          this.isSuccessful = false;
        }, 3000);
      },
      error: err => {
        this.isFailed = true;
        setTimeout(() => {
          this.isFailed = false;
        }, 3000);
      }
    });
  }

  onCancel() {
    this.location.back();
  }

  sign = require('jwt-encode');

  onFileSelectedForProfilePhoto(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileReader = reader.result as string;
        this.profilePathService.addPhotoProfile(this.fileReader).subscribe({
          next: value => {
            localStorage.setItem('path', this.sign(value.path, 'secret'));
            this.fileReader = jwt_decode(localStorage.getItem('path')!);
          }
        })
      };
    }

  }

  getPhotoProfilePath() {
    this.profilePathService.getPhotoProfilePath().subscribe({
      next: value => {
        this.fileReader = value.path;
      }
    })
  }


}

