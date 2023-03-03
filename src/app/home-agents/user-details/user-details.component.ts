import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from "../../Services/user-details-service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(public userDetailsService: UserDetailsService, private formBuilder: FormBuilder) {
  }

  userDetailsForm = this.formBuilder.group({
    userId: [this.userDetailsService.data?.userId, [Validators.required]],
    email: [this.userDetailsService.data?.email, [Validators.required]],
    firstName: [this.userDetailsService.data?.firstName, [Validators.required]],
    lastName: [this.userDetailsService.data?.lastName, [Validators.required]],
    phoneNumber: [this.userDetailsService.data?.phoneNumber, [Validators.required]],
    gender: [this.userDetailsService.data?.gender, [Validators.required]],
    address: [this.userDetailsService.data?.address, [Validators.required]],
    nationality: [this.userDetailsService.data?.nationality, [Validators.required]],
    birthDate: [this.userDetailsService.data?.birthDate, [Validators.required]],
    iban: [this.userDetailsService.data?.iban, [Validators.required]],
    familySituation: [this.userDetailsService.data?.familySituation, [Validators.required]],
    occupation: [this.userDetailsService.data?.occupation, [Validators.required]],
    employmentStartDate: [this.userDetailsService.data?.employmentStartDate, [Validators.required]],
    monthlyIncome: [this.userDetailsService.data?.monthlyIncome, [Validators.required]]
  })

  ngOnInit(): void {
    this.userDetailsService.getUserDetails(localStorage.getItem('contractId')!).subscribe({
      next: resData =>{
        this.userDetailsForm.setValue({
          userId:this.userDetailsService.data?.userId,
          email:this.userDetailsService.data?.email,
          firstName:this.userDetailsService.data?.firstName,
          lastName:this.userDetailsService.data?.lastName,
          phoneNumber:this.userDetailsService.data?.phoneNumber,
          gender:this.userDetailsService.data?.gender,
          address:this.userDetailsService.data?.address,
          nationality:this.userDetailsService.data?.nationality,
          birthDate:this.userDetailsService.data?.birthDate,
          iban:this.userDetailsService.data?.iban,
          familySituation:this.userDetailsService.data?.familySituation,
          occupation:this.userDetailsService.data?.occupation,
          employmentStartDate:this.userDetailsService.data?.employmentStartDate,
          monthlyIncome:this.userDetailsService.data?.monthlyIncome,
        })
      }
    });
  }

}
