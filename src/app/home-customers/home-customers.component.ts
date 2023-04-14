import {Component, OnInit, ViewChild} from '@angular/core';
import {LoansForOneUser, RetrieveLoansService} from "../Services/retrieve-loans-service";
import {LoginService} from "../Services/login-service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PhotoProfilePathService} from "../Services/profile-path-service";

export interface TableElements {
  contractId: number;
  amount: number;
  amountToBePaid: number;
  creditType: string;
  interestRate: number;
  tenure: number;
  esDecision: string;
}

@Component({
  selector: 'app-home-customers',
  templateUrl: './home-customers.component.html',
  styleUrls: ['./home-customers.component.css']
})


export class HomeCustomersComponent implements OnInit {

  userInfo = JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',');
  userName = this.userInfo[3] + ' ' + this.userInfo[4];
  allLoans: LoansForOneUser[] = [];
  displayedColumns: string[] = ['contractId', 'amount', 'amountToBePaid', 'creditType', 'interestRate', 'tenure', 'esDecision'];
  isDataRetrieved = false;
  dataSource = new MatTableDataSource<TableElements>();
  fileReader = '';

  constructor(public retrieveLoansService: RetrieveLoansService, public logInService: LoginService, private route: Router,
              private photoProfileService: PhotoProfilePathService) {
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getLoanData();
    this.getPhotoProfilePath();
  }

  getLoanData() {
    this.retrieveLoansService.getLoanDataForOneUser().subscribe({
      next: resData => {
        this.allLoans = resData;
        this.dataSource = new MatTableDataSource(resData);
        this.dataSource.paginator = this.paginator;
        this.isDataRetrieved = true;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  clickNewLoan() {
    this.route.navigate(['newLoan']);
  }

  onClickProfile() {
    this.route.navigate(['profilePage']);
  }

  getPhotoProfilePath() {
    this.photoProfileService.getPhotoProfilePath().subscribe({
      next: value => {
        this.fileReader = value.path;
      }
    })
  }

  clickTrading() {
    this.route.navigate(['stockTrading']);
  }
}

