import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {FormGroup} from "@angular/forms";

export interface ContractDetailsResponse {
  contractId: string,
  amount: string,
  interestRate: string,
  tenure: string,
  installment: string,
  amountToBePaid: string,
  creditBureauScore: string,
  esDecision: string,
  creditType: string,
  creationDate: Date,
  lastUpdate: Date,
}

@Injectable({providedIn: 'root'})
export class ContractDetailsService{
  requestParams = new HttpParams();
  data: ContractDetailsResponse|undefined;
  constructor(private http: HttpClient, private route: Router) {
  }

  getContractDetails(contractId: number) {
    this.requestParams = this.requestParams.set('id', contractId);
    return this.http.get<ContractDetailsResponse>('http://localhost:8080/findCreditLoanById', {
      params: this.requestParams
    }).pipe(catchError(errorResponse => {
        return throwError(() => new Error(errorResponse));
      }), tap(resData => {
      this.data = resData;
      this.route.navigate(['contractDetails']);
      })
    )
  }

  updateContractGreen(formBuilder: FormGroup){
    return this.http.put('http://localhost:8080/updateCreditLoanById', {
      contractId: formBuilder.get('contractId')!.value as number,
      amount:formBuilder.get('amount')!.value as number,
      interestRate:formBuilder.get('interestRate')!.value as number,
      tenure:formBuilder.get('tenure')!.value as number,
      installment:formBuilder.get('installment')!.value as number,
      amountToBePaid:formBuilder.get('amountToBePaid')!.value as number,
      creditBureauScore:formBuilder.get('creditBureauScore')!.value as number,
      esDecision:'GREEN',
      creditType:formBuilder.get('creditType')!.value,
      creationDate:formBuilder.get('creationDate')!.value as Date,
      lastUpdate: new Date()
    }).pipe(catchError(errorResponse => {
        return throwError(() => new Error(errorResponse));
      }), tap(resData => {
      })
    )
  }

  updateContractRed(formBuilder: FormGroup){
    return this.http.put('http://localhost:8080/updateCreditLoanById', {
      contractId: formBuilder.get('contractId')!.value as number,
      amount:formBuilder.get('amount')!.value as number,
      interestRate:formBuilder.get('interestRate')!.value as number,
      tenure:formBuilder.get('tenure')!.value as number,
      installment:formBuilder.get('installment')!.value as number,
      amountToBePaid:formBuilder.get('amountToBePaid')!.value as number,
      creditBureauScore:formBuilder.get('creditBureauScore')!.value as number,
      esDecision:'RED',
      creditType:formBuilder.get('creditType')!.value,
      creationDate:formBuilder.get('creationDate')!.value as Date,
      lastUpdate: new Date()
    }).pipe(catchError(errorResponse => {
        return throwError(() => new Error(errorResponse));
      }), tap(resData => {
      })
    )
  }

}
