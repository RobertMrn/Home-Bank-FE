import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserDetailsService} from "../Services/user-details-service";
import {Router} from "@angular/router";
import * as Tesseract from "tesseract.js";
import {DialogComponent} from "../dialog-for-delete-users/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogForNewUserComponent} from "./dialog-for-new-user/dialog-for-new-user.component";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  roles = ['Customer', 'Agent'];
  nationality: string[] = ['EU', 'ROU', 'AF', 'AS', 'NA', 'SA', 'OC'];
  gender: string[] = ['M', 'F'];
  isSuccessful = false;
  fileReader = '';

  constructor(private formBuilder: FormBuilder, public userDetails: UserDetailsService, private route: Router,
              private dialog: MatDialog) {
  }

  newUserControl = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%=-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    phoneNumber: ['', [Validators.minLength(12), Validators.maxLength(12), Validators.required,
      Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{6})([-\s\.]?[0-9]{3,4})')]],
    gender: ['', [Validators.required]],
    address: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    personalUniqueCode: ['', [Validators.required]],
    userRole: ['', [Validators.required]],
    hashedPassword: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogForNewUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.newUserControl.get('firstName')?.setValue(this.userDetails.autoCompleteForm.get('firstName')!.value);
        this.newUserControl.get('lastName')?.setValue(this.userDetails.autoCompleteForm.get('lastName')!.value);
        this.newUserControl.get('gender')?.setValue(this.userDetails.autoCompleteForm.get('gender')!.value);
        this.newUserControl.get('nationality')?.setValue(this.userDetails.autoCompleteForm.get('nationality')!.value);
        this.newUserControl.get('address')?.setValue(this.userDetails.autoCompleteForm.get('address')!.value + ' ' +
          this.userDetails.autoCompleteForm.get('town')!.value);
      }
    })
  }

  sign = require('jwt-encode');

  onSubmit() {
    this.userDetails.addUser(this.newUserControl).subscribe({
      next: value => {
        this.isSuccessful = true;
        this.userDetails.addUserRole(value.userId as unknown as number, this.newUserControl.get('userRole')?.value as string).subscribe();
        this.isSuccessful = false;
        this.route.navigate(['homeAdmin']);
      }
    });
  }

}
