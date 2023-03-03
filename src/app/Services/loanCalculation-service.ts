import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {catchError, throwError} from "rxjs";

export interface LoanCalculationResponse {
  installment: string,
  sumToBePaid: string
}
@Injectable({providedIn: 'root'})
export class LoanCalculationService{
  constructor(private http: HttpClient) {
  }

  calculate(loanForm: FormGroup){
    return this.http.post<LoanCalculationResponse>('http://localhost:8080/calculateCredit',{
      amount:loanForm.get('amount')!.value as number,
      tenure:loanForm.get('tenures')!.value as number,
      interestRate: loanForm.get('interestRates')!.value as number,
      creditType: loanForm.get('creditTypes')!.value
    }).pipe(catchError(errorResponse =>{
      return throwError(()=> new Error(errorResponse));
    }))
  }
}
