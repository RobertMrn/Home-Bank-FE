import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UpdateUserService} from "../../Services/update-user-service";

@Component({
  selector: 'app-dialog-for-changing-password',
  templateUrl: './dialog-for-changing-password.component.html',
  styleUrls: ['./dialog-for-changing-password.component.css']
})
export class DialogForChangingPasswordComponent {

  constructor(private formBuilder: FormBuilder, private updatePassword: UpdateUserService) {

  }
  changePassword = this.formBuilder.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

  onSubmit() {

  }
}
