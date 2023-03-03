import {Component, OnInit} from '@angular/core';
import {LoginService} from "./Services/login-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'licentaFE';
  tokenExpirationDate = new Date(JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[6]);

  constructor(private logInService: LoginService) {
  }

  ngOnInit() {
    if (localStorage.getItem('response') != null) {
      if (new Date(JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[6]).getTime() < new Date().getTime()) {
        this.logInService.isTokenExpired = 'Your session token has expired. Please log in again.'
        this.logInService.logOut();
      }
    }
    console.log(JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[6]);
    console.log(this.tokenExpirationDate.getTime());
    console.log(new Date());
    this.logInService.autoLogin();
  }

}
