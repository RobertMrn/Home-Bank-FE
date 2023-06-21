import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {LoginService} from "./login-service";
import {FormGroup} from "@angular/forms";

export interface LoansForOneUser {
  contractId: number;
  amount: number;
  amountToBePaid: number;
  interestRate: number;
  tenure: number;
  creditType: string;
  esDecision: string;
}

export interface LoansForAllUsers {
  contractId: string;
  amount: number;
  amountToBePaid: number;
  creationDate: Date;
  creditBureauScore: number;
  creditType: string;
  esDecision: string;
  installment: number;
  interestRate: number;
  lastUpdate: Date;
  tenure: number;
  user: number;
}

@Injectable({providedIn: 'root'})
export class RetrieveLoansService {
  requestParams = new HttpParams();

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  getLoanDataForOneUser() {
    let userInfo = this.logInService.getDataFromToken(localStorage.getItem('response')!);
    let userInfoAsArray = JSON.stringify(userInfo).split(',');
    this.requestParams = this.requestParams.set('userId', userInfoAsArray[2]);
    return this.http.get<LoansForOneUser[]>('http://localhost:8080/findCreditLoansByUserId', {
      params: this.requestParams
    }).pipe(catchError(errorResponse => {
      return throwError(() => new Error(errorResponse));
    }))
  }

  getLoanDataForAllUsers() {
    return this.http.get<LoansForAllUsers[]>('http://localhost:8080/findAllLoans', {}).pipe(catchError(err => {
      return throwError(() => new Error(err))
    }))
  }

  getBalanceForUser() {
    let userInfo = this.logInService.getDataFromToken(localStorage.getItem('response')!);
    let userInfoAsArray = JSON.stringify(userInfo).split(',');
    this.requestParams = this.requestParams.set('userId', userInfoAsArray[2]);
    return this.http.get('http://localhost:8080/getOnlyBalance', {
      params: this.requestParams
    })
  }

  addCustomerBalance(form: FormGroup){
    let userInfo = this.logInService.getDataFromToken(localStorage.getItem('response')!);
    let userInfoAsArray = JSON.stringify(userInfo).split(',');
    return this.http.post('http://localhost:8080/addCustomerBalance',{
      userId: userInfoAsArray[2],
      balance: form.get('amount')?.value as number
    })
  }
}
