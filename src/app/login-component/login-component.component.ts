import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../Services/login-service";
import {Router} from "@angular/router";
import {DialogForNewUserComponent} from "../new-user/dialog-for-new-user/dialog-for-new-user.component";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogForChangingPasswordComponent
} from "./dialog-for-changing-password/dialog-for-changing-password.component";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  areCredentialsWrong: string = '';
  isSuccessful = false;

  constructor(private formBuilder: FormBuilder, public logInService: LoginService, private route: Router, private dialog: MatDialog) {
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    this.logInService.signIn(email!, password!).subscribe({
        next: resData => {
          console.log(resData);
          this.isSuccessful = true;
          setTimeout(() => {
            let newUser = this.logInService.tokenInfoAsArray[7];
            console.log(newUser);
            if (newUser=='newUser') {
              const dialogRef = this.dialog.open(DialogForChangingPasswordComponent);
            } else {
              let userRole = this.logInService.tokenInfoAsArray[5];
              if (userRole == 'Customer') {
                this.route.navigate(['homeCustomers']);
                this.isSuccessful = false;
              } else if (userRole == 'Agent') {
                this.isSuccessful = false;
                this.route.navigate(['homeAgents']);
              } else if (userRole == 'Admin') {
                this.isSuccessful = false;
                this.route.navigate(['homeAdmin']);
              }
            }
          }, 1000);

        },
        error: errorResponse => {
          this.areCredentialsWrong = errorResponse;
          console.log(errorResponse);
        }
      }
    );
  }


}
