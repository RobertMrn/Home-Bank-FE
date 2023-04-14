import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoginService} from "./login-service";
import {catchError, throwError} from "rxjs";

export interface ChatBotResponse {
  answer: string;
}

@Injectable({providedIn: 'root'})
export class ChatBotService {
  requestParams = new HttpParams();

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  getAnswerForChatBot(event: any) {
    let userId = JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2] as unknown as number;
    this.requestParams = this.requestParams.set('question', event);
    this.requestParams = this.requestParams.set('userId', userId);
    return this.http.get<ChatBotResponse>('http://localhost:8080/getResponseChatBot', {
        params: this.requestParams
      }
    ).pipe(catchError(err => {
      return throwError(() => new Error(err));
    }))
  }


}
