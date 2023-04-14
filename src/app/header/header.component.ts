import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../Services/login-service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticatedCustomer = false;
  isAuthenticatedAgent = false;
  isAuthenticatedAdmin = false;
  customerSub: Subscription | undefined;
  agentSub: Subscription | undefined;
  adminSub: Subscription | undefined;

  constructor(private logInService: LoginService, private route: Router) {
  }

  ngOnInit(): void {
    this.agentSub = this.logInService.logInAgent.subscribe(user => {
        this.isAuthenticatedAgent = !!user;
      }
    )
    this.customerSub = this.logInService.logInCustomer.subscribe(user => {
        this.isAuthenticatedCustomer = !!user;
      }
    )
    this.adminSub = this.logInService.logInAdmin.subscribe(user => {
        this.isAuthenticatedAdmin = !!user;
      }
    )

  }

  onLogOut() {
    this.logInService.logOut();
  }

  ngOnDestroy() {
    this.customerSub?.unsubscribe();
    this.agentSub?.unsubscribe();
    this.adminSub?.unsubscribe();
  }

  onClickHome() {
    if (JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[5] === 'Customer') {
      this.route.navigate(['homeCustomers']);
    } else if (JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[5] === 'Agent') {
      this.route.navigate(['homeAgents']);
    } else if (JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[5] === 'Admin') {
      this.route.navigate(['homeAdmin']);
    }
  }

  onClickStocks() {
    this.route.navigate(['stockTrading']);
  }

  onPortfolio() {
    this.route.navigate(['portfolio']);
  }
}
