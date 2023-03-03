import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {LoginService} from "./login-service";
import {catchError, throwError} from "rxjs";

export interface DecisionResponse {
  decision: string;
}

export interface CreditLoanResponse {
  contractId: string;
}

export interface UserPersonalData {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  gender: string,
  address: string,
  nationality: string,
  birthDate: Date,
  personalUniqueCode: string
}

@Injectable({providedIn: 'root'})
export class PersonalDataService {
  amount: number = 0;
  interestRate: number = 0;
  tenure: number = 0;
  installment: number = 0;
  amountToBePaid: number = 0;
  creditBureauScore: number = 0;
  esDecision: string = '';
  creditType: string = '';
  userInfo = JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',');
  userId = this.userInfo[2];
  contractId = 0;
  requestParams = new HttpParams();

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  savePersonalDataInDB(personalDataForm: FormGroup) {
    return this.http.post<DecisionResponse>('http://localhost:8080/addConsumerData', {
      consumerDataId: this.contractId,
      contractId: this.contractId,
      iban: personalDataForm.get('iban')?.value,
      familySituation: personalDataForm.get('familySituation')?.value,
      livingSituation:personalDataForm.get('livingSituation')?.value,
      numberOfChildren:personalDataForm.get('numberOfChildren')?.value,
      occupation: personalDataForm.get('occupation')?.value,
      employmentStartDate: personalDataForm.get('employmentStartDate')?.value,
      monthlyIncome: personalDataForm.get('monthlyIncome')?.value,
    })
  }

  addLoanInDatabase() {
    return this.http.post<CreditLoanResponse>('http://localhost:8080/addCreditLoan',
      {
        user: this.userId,
        amount: this.amount,
        interestRate: this.interestRate,
        installment: this.installment,
        tenure: this.tenure,
        amountToBePaid: this.amountToBePaid,
        creditBureauScore: this.creditBureauScore,
        esDecision: this.esDecision,
        creditType: this.creditType,
        creationDate: new Date(),
        lastUpdate: new Date()
      })
  }

  getPersonalData(userId: string){
    this.requestParams = this.requestParams.set('id', userId as unknown as number);
    return this.http.get<UserPersonalData>('http://localhost:8080/findUser',{
      params: this.requestParams
    }).pipe(catchError(errorResponse => {
        return throwError(() => new Error(errorResponse));
      })
    )
  }



}
