import {Component, OnInit, ViewChild} from '@angular/core';
import {LoansForAllUsers, RetrieveLoansService} from "../Services/retrieve-loans-service";
import {LoginService} from "../Services/login-service";
import {Router} from "@angular/router";
import {UserDetailsService} from "../Services/user-details-service";
import {ContractDetailsService} from "../Services/contract-details-service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

export interface TableElements {
  contractId: string;
  amount: number;
  amountToBePaid: number;
  creationDate: Date;
  creditBureauScore:number;
  creditType: string;
  esDecision: string;
  installment: number;
  interestRate: number;
  lastUpdate: Date;
  tenure: number;
  user: number;
}

@Component({
  selector: 'app-home-agents',
  templateUrl: './home-agents.component.html',
  styleUrls: ['./home-agents.component.css']
})
export class HomeAgentsComponent implements OnInit {
  public static contractId: number;
  allLoans: LoansForAllUsers[] = [];


  userInfo = JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',');
  userName = this.userInfo[3] + ' ' + this.userInfo[4];

  constructor(public  retrieveLoansService: RetrieveLoansService, public logInService: LoginService, private route: Router,
              private userDetailsService: UserDetailsService, private contractDetailsService: ContractDetailsService) { }

  displayedColumns: string[] = ['contractId', 'amount', 'amountToBePaid', 'creationDate', 'creditBureauScore', 'creditType', 'esDecision', 'installment', 'interestRate', 'lastUpdate', 'tenure', 'userId'];

  dataSource = new MatTableDataSource<TableElements>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getAllLoansData();
  }

  getAllLoansData(){
    this.retrieveLoansService.getLoanDataForAllUsers().subscribe({
      next: resData =>{
        this.allLoans = resData;
        this.dataSource = new MatTableDataSource(resData);
        this.dataSource.paginator = this.paginator;

      },
      error: err=>{
        console.log(err)
      }
    })
  }

  sign = require('jwt-encode');

  getUserDetails(contractId: number){
    HomeAgentsComponent.contractId = contractId;
    localStorage.setItem('contractId',this.sign(contractId,'secret'));
    this.userDetailsService.getUserDetails(localStorage.getItem('contractId')!).subscribe({
    });
  }

  getContractDetails(contractId: number){
    this.contractDetailsService.getContractDetails(contractId).subscribe();
  }

  onClickProfile(){
    this.route.navigate(['profilePage']);
  }

}
