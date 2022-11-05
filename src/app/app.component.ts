import {Component, OnInit} from '@angular/core';
import {LoginService} from "./Services/login-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'licentaFE';
  constructor(private logInService: LoginService) {
  }

  ngOnInit() {
    this.logInService.autoLogin();
  }
}
