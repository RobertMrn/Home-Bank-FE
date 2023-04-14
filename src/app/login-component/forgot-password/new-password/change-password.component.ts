import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isSuccessful = false;
  isFailure = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) {
  }

  changePasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required]],
    confirmedPassword: ['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  get matchBetweenPasswords(){
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    return this.http.post('http://localhost:8080/newPassword', {
      newPassword: this.changePasswordForm.get('confirmedPassword')?.value,
      token: String(this.route.url.split('=')[1]).split('%')[0]
    }).subscribe({
      next: value => {
        this.isSuccessful = true;
        setTimeout(() => {
          this.isSuccessful = false;
        }, 2000);
      },
      error: err => {
        this.isFailure = true;
        setTimeout(() => {
          this.isSuccessful = false;
        }, 2000);
      }
    });
  }

}
