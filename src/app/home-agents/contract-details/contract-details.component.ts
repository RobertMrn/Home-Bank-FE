import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ContractDetailsService} from "../../Services/contract-details-service";

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {
  isAccepted = false;
  isDeclined = false;


  constructor(private formBuilder: FormBuilder, public contractDetailsService: ContractDetailsService) { }

  contractDetailsForm = this.formBuilder.group({
    contractId: [this.contractDetailsService.data?.contractId, [Validators.required]],
    amount: [this.contractDetailsService.data?.amount, [Validators.required]],
    interestRate: [this.contractDetailsService.data?.interestRate, [Validators.required]],
    tenure: [this.contractDetailsService.data?.tenure, [Validators.required]],
    installment: [this.contractDetailsService.data?.installment, [Validators.required]],
    amountToBePaid: [this.contractDetailsService.data?.amountToBePaid, [Validators.required]],
    creditBureauScore: [this.contractDetailsService.data?.creditBureauScore, [Validators.required]],
    esDecision: [this.contractDetailsService.data?.esDecision, [Validators.required]],
    creditType: [this.contractDetailsService.data?.creditType, [Validators.required]],
    creationDate: [this.contractDetailsService.data?.creationDate, [Validators.required]],
    lastUpdate: [this.contractDetailsService.data?.lastUpdate, [Validators.required]],
  })

  ngOnInit(): void {
    this.contractDetailsService. getContractDetails(Number(localStorage.getItem('contractId')!)).subscribe({
      next: resData =>{
        this.contractDetailsForm.setValue({
          contractId:this.contractDetailsService.data?.contractId,
          amount:this.contractDetailsService.data?.amount,
          interestRate:this.contractDetailsService.data?.interestRate,
          tenure:this.contractDetailsService.data?.tenure,
          installment:this.contractDetailsService.data?.installment,
          amountToBePaid:this.contractDetailsService.data?.amountToBePaid,
          creditBureauScore:this.contractDetailsService.data?.creditBureauScore,
          esDecision:this.contractDetailsService.data?.esDecision,
          creditType:this.contractDetailsService.data?.creditType,
          creationDate:this.contractDetailsService.data?.creationDate,
          lastUpdate:this.contractDetailsService.data?.lastUpdate
        })
      }
    });
  }

  clickAcceptButton(){
    this.contractDetailsService.updateContractGreen(this.contractDetailsForm).subscribe();
    this.isAccepted = true;
    setTimeout(()=>{
      this.isAccepted = false;
    }, 3000);
  }

  clickDeclineButton(){
    this.contractDetailsService.updateContractRed(this.contractDetailsForm).subscribe();
    this.isDeclined = true;
    setTimeout(()=>{
      this.isDeclined = false;
    }, 3000);
  }

}
