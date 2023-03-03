import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {LoginService} from "./login-service";

export interface DecisionResponse{
  decision:string;
}

@Injectable({providedIn: 'root'})
export class DecisionService {
  requestParams = new HttpParams();
  amountToBePaid: string = '';
  installment: string | null = '';
  loanDuration: string | null = '';

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  getDecision(personalDataForm: FormGroup) {
    console.log(this.loanDuration);
    let userInfo = this.logInService.getDataFromToken(localStorage.getItem('response')!);
    let userInfoAsArray = JSON.stringify(userInfo).split(',');
    this.requestParams = this.requestParams.set('userId', userInfoAsArray[2]);
    return this.http.post<DecisionResponse>('http://localhost:8080/getDecision', {
      iban: personalDataForm.get('iban')?.value,
      familySituation: personalDataForm.get('familySituation')?.value,
      occupation: personalDataForm.get('occupation')?.value,
      employmentStartDate: personalDataForm.get('employmentStartDate')?.value,
      monthlyIncome: personalDataForm.get('monthlyIncome')?.value,
      loanDuration: this.loanDuration,
      monthlyRate: this.installment,
      amount: this.amountToBePaid
    }, {
      params: this.requestParams
    })
  }
}
