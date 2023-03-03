import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DecisionService} from "../../../Services/decision-service";
import {PersonalDataService} from "../../../Services/personal-data-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
  familySituation: string[] = ['Single', 'Married', 'Widowed', 'Divorced'];
  livingSituation: string[] = ['Single', 'With family', 'With spouse', 'With spouse and children', 'With others'];
  isSuccessful = false;

  constructor(private formBuilder: FormBuilder, private decisionService: DecisionService, private personalDataService: PersonalDataService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  personalDataForm = this.formBuilder.group({
    iban: ['', [Validators.required, Validators.pattern('^[RO]{2}(?:[ ]?[0-9]){22}$')]],
    familySituation: ['', [Validators.required]],
    livingSituation: ['', [Validators.required]],
    numberOfChildren: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    employmentStartDate: ['', [Validators.required]],
    monthlyIncome: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
  })

  sign = require('jwt-encode');

  onSubmit() {
    this.decisionService.getDecision(this.personalDataForm).subscribe({
      next: resDataDecision => {
        this.isSuccessful = true;
        this.personalDataService.esDecision = resDataDecision.decision;
        this.personalDataService.addLoanInDatabase().subscribe({
            next: resDataAddLoan => {
              this.personalDataService.contractId = resDataAddLoan.contractId as unknown as number;
              localStorage.setItem('contractId', this.sign(resDataAddLoan.contractId as unknown as number, 'secret'));
              if (resDataDecision.decision == 'GREEN') {
                this.onClickAgreeForSavingConsumerData();
                this.isSuccessful = false;
                this.router.navigate(['greenDecision']);
              } else if (resDataDecision.decision == 'YELLOW') {
                this.onClickAgreeForSavingConsumerData();
                this.isSuccessful = false;
                this.router.navigate(['yellowDecision']);
              } else {
                this.isSuccessful = false;
                this.router.navigate(['redDecision']);
              }
            }
          }
        );
        console.log(resDataDecision);
      },
      error: errorResponse => {
        console.log(errorResponse);
      }
    })
  }

  onClickAgreeForSavingConsumerData() {
    this.personalDataService.savePersonalDataInDB(this.personalDataForm).subscribe({
      next: resData => {
        console.log(resData);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
