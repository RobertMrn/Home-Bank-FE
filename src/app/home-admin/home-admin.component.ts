import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../Services/login-service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserDetailsService} from "../Services/user-details-service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog-for-delete-users/dialog.component";
import {PhotoProfilePathService} from "../Services/profile-path-service";

export interface TableElements {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
  nationality: string;
  birthDate: Date;
  role: string;
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
  fileReader = '';


  constructor(private logInService: LoginService, private route: Router, private userService: UserDetailsService
    , private dialog: MatDialog, private photoProfileService: PhotoProfilePathService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getUsersInfo();
    this.getPhotoProfilePath();
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
        console.log(this.dataSource.filteredData);
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

  getPhotoProfilePath() {
    this.photoProfileService.getPhotoProfilePath().subscribe({
      next: value => {
        this.fileReader = value.path;
      }
    })
  }

}

