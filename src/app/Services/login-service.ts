import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {LoginModel} from "../../models/loginModel";

export interface LogInResponse{
  objectEncoder: string
}

@Injectable({providedIn: 'root'})
export class LoginService{

  logIn = new BehaviorSubject<LoginModel>(null as any);

  constructor(private http: HttpClient, private route: Router) {
  }

  signIn(email: string, password: string){
    return this.http.post<LogInResponse>('http://localhost:8080/authenticate',{
      email:email,
      password:password
    }).pipe(catchError(errorResponse =>{
      return throwError(() => new Error('Email or password are wrong'));
    }),tap(resData =>{
      this.handleLogin(resData.objectEncoder);
      })
      )
  }

  logOut(){
    this.logIn.next(null as any);
    localStorage.clear();
    this.route.navigate(['login']);
  }

  handleLogin(objectEncoder:string)
  {
    const logIn= new LoginModel(objectEncoder);
    this.logIn.next(logIn);
    localStorage.setItem('userToken', JSON.stringify(logIn));
  }

  autoLogin(){
    const userData:{
      objectEncoder: string;
    } = JSON.parse(localStorage.getItem('userToken')!);
    if(!userData){
      return;
    }
    const loadedUser = new LoginModel(userData.objectEncoder);
    this.logIn.next(loadedUser);
  }
}
