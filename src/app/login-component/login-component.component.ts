import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../Services/login-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  areCredentialsWrong: string = '';
  isSuccessful = false;

  constructor(private formBuilder: FormBuilder, public logInService: LoginService, private route: Router) {
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
          setTimeout(()=>{
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
          }, 1000);

        },
        error: errorResponse => {
          this.areCredentialsWrong = errorResponse;
          console.log(errorResponse);
        }
      }
    )
  }


}
