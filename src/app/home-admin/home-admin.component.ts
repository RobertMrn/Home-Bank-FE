import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../Services/login-service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserDetailsService} from "../Services/user-details-service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

export interface TableElements {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
  nationality: string;
  birthDate: Date;
  toDelete: string;
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  userInfo = JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',');
  userName = this.userInfo[3] + ' ' + this.userInfo[4];
  dataSource = new MatTableDataSource<TableElements>();
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'phoneNumber', 'gender', 'address', 'nationality', 'birthDate', 'toDelete'];

  constructor(private logInService: LoginService, private route: Router, private userService: UserDetailsService
    , private dialog: MatDialog) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getUsersInfo();
  }

  onClickProfile() {
    this.route.navigate(['profilePage']);
  }

  clickNewUser() {
    this.route.navigate(['newUser']);
  }

  getUsersInfo() {
    this.userService.getAllUsers().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.userService.deleteUser(userId).subscribe({
          next: value => {
            window.location.reload();
          }
        });
      }
    })
  }

}

