import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../Services/login-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription | undefined;

  constructor(private logInService: LoginService) {
  }

  ngOnInit(): void {
    this.userSub = this.logInService.logIn.subscribe(user => {
        this.isAuthenticated = !!user;
      }
    )
  }

  onLogOut(){
    this.logInService.logOut();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

}
