import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {LoginModel} from "../../models/loginModel";
import jwt_decode from 'jwt-decode';

export interface LogInResponse {
  response: string;
}

@Injectable({providedIn: 'root'})
export class LoginService {
  userData: {
    response: string;
  } = JSON.parse(localStorage.getItem('userData')!);

  firstName: string = '';
  logInCustomer = new BehaviorSubject<LoginModel>(null as any);
  logInAgent = new BehaviorSubject<LoginModel>(null as any);
  logInAdmin = new BehaviorSubject<LoginModel>(null as any);
  tokenInfo: any;
  tokenInfoAsArray: string[] = [];
  isTokenExpired = '';

  constructor(private http: HttpClient, private route: Router) {
  }

  getDataFromToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  signIn(email: string, password: string) {
    return this.http.post<LogInResponse>('http://localhost:8080/authenticate', {
      email: email,
      password: password
    }).pipe(catchError(errorResponse => {
        return throwError(() => new Error('Email or password are wrong'));
      }), tap(resData => {
        localStorage.setItem('response', resData.response);
        this.tokenInfo = this.getDataFromToken(localStorage.getItem('response')!);
        this.tokenInfoAsArray = JSON.stringify(this.tokenInfo).split(',');
        localStorage.setItem('userData', JSON.stringify(resData));
        localStorage.setItem('jwtToken', JSON.stringify(this.tokenInfoAsArray[1]));
        if (this.tokenInfoAsArray[5] === 'Customer') {
          this.handleLoginCustomer(resData.response);
        } else if (this.tokenInfoAsArray[5] === 'Agent') {
          this.handleLoginAgent(resData.response);
        } else if (this.tokenInfoAsArray[5] === 'Admin') {
          this.handleLoginAdmin(resData.response);
        }
      })
    )
  }

  logOut() {
    this.logInCustomer.next(null as any);
    this.logInAgent.next(null as any);
    this.logInAdmin.next(null as any);
    localStorage.clear();
    this.route.navigate(['login']);
  }

  handleLoginCustomer(response: string) {
    const logIn = new LoginModel(response);
    this.logInCustomer.next(logIn);
  }

  handleLoginAgent(response: string) {
    const logIn = new LoginModel(response);
    this.logInAgent.next(logIn);
  }

  handleLoginAdmin(response: string) {
    const logIn = new LoginModel(response);
    this.logInAdmin.next(logIn);
  }

  autoLogin() {
    if (!this.userData) {
      return;
    }
    const loadedUser = new LoginModel(this.userData.response);
    if (JSON.stringify(this.getDataFromToken(localStorage.getItem('response')!)).split(',')[5] === 'Customer') {
      this.logInCustomer.next(loadedUser);
    }
    if (JSON.stringify(this.getDataFromToken(localStorage.getItem('response')!)).split(',')[5] === 'Agent') {
      this.logInAgent.next(loadedUser);
    }
    if (JSON.stringify(this.getDataFromToken(localStorage.getItem('response')!)).split(',')[5] === 'Admin') {
      this.logInAdmin.next(loadedUser);
    }

  }

}
