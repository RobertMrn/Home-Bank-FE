import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isSuccessful = false;
  isFailure = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  resetPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%=-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  })

  ngOnInit(): void {
  }

  onSubmit() {
    return this.http.post('http://localhost:8080/forgot_password',{
      email: this.resetPasswordForm.get('email')?.value
    }).subscribe({
      next: value => {
        this.isSuccessful = true;
        setTimeout(()=>{
          this.isSuccessful=false;
        }, 2000);
      },
      error: err => {
        this.isFailure = true;
        setTimeout(()=>{
          this.isFailure=false;
        }, 2000);
      }
    });
  }
}
