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
  areCredentialsWrong: string ='';

  constructor(private formBuilder: FormBuilder, private logInService: LoginService, private route: Router) {
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
          // this.decrypt.decryptData(resData);
          console.log(resData);
          this.route.navigate(['homeCustomers']);
        },
      error: errorResponse =>{
          this.areCredentialsWrong=errorResponse;
          console.log(errorResponse);
      }
      }
    )
  }



}
