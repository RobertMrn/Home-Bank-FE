import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoanCalculationService} from "../../Services/loanCalculation-service";
import {Router} from "@angular/router";
import {DecisionService} from "../../Services/decision-service";
import {PersonalDataService} from "../../Services/personal-data-service";

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit {
  creditTypes: string[] = ['Student loan', 'New home', 'Personal needs', 'Car loan'];
  tenures: number[] = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
  installment: string = '';
  sumToBePaid: string = '';
  isSuccessfully=false;

  constructor(private formBuilder: FormBuilder, private loanCalculation: LoanCalculationService, private route: Router,private decisionService: DecisionService
            , private personalDataService: PersonalDataService) {
  }

  newLoanControl = this.formBuilder.group({
    creditTypes: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    tenures: ['', [Validators.required]],
    interestRates: ['', [Validators.required]]
  });

  get creditType(){
    return this.newLoanControl.get('creditTypes');
  }


  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  findInterestRate():string {
    if (this.newLoanControl.get('creditTypes')?.value == 'Student loan') {
      this.newLoanControl.get('interestRates')?.setValue('3');
    } else if (this.newLoanControl.get('creditTypes')?.value == 'New home') {
      this.newLoanControl.get('interestRates')?.setValue('8');
    } else if (this.newLoanControl.get('creditTypes')?.value == 'Personal needs') {
      this.newLoanControl.get('interestRates')?.setValue('5');
    } else if (this.newLoanControl.get('creditTypes')?.value == 'Car loan') {
      this.newLoanControl.get('interestRates')?.setValue('7');
    }
    return 'interest rate';
  }

  onSubmit() {
    this.decisionService.loanDuration = this.newLoanControl.get('tenures')!.value;
    this.loanCalculation.calculate(this.newLoanControl).subscribe(
      {
        next: resData => {
          this.isSuccessfully=true;
          this.installment = resData.installment;
          this.sumToBePaid = resData.sumToBePaid;
          this.decisionService.amountToBePaid = this.sumToBePaid;
          this.decisionService.installment = this.installment;
          this.personalDataService.amount = this.newLoanControl.get('amount')!.value as unknown as number;
          this.personalDataService.interestRate = this.newLoanControl.get('interestRates')!.value as unknown as number;
          this.personalDataService.installment = resData.installment as unknown as number;
          this.personalDataService.amountToBePaid = resData.sumToBePaid as unknown as number;
          this.personalDataService.creditType = this.newLoanControl.get('creditTypes')!.value as string;
          this.personalDataService.tenure = this.newLoanControl.get('tenures')!.value as unknown as number;
          console.log(resData);
        },
        error: errorResponse =>{
          console.log(errorResponse);
        }
      }
    )
  }


  ngOnInit(): void {
    }

  onClickNext() {
    this.route.navigate(['personalData']);
  }
}
