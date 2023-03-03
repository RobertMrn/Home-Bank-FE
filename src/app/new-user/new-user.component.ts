import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserDetailsService} from "../Services/user-details-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  roles = ['Customer', 'Agent'];
  nationality: string[] = ['EU', 'RO', 'AF', 'AS', 'NA', 'SA', 'OC'];
  gender: string[] = ['MALE', 'FEMALE'];
  isSuccessful = false;

  constructor(private formBuilder: FormBuilder, private userDetails: UserDetailsService, private route: Router) {
  }

  newUserControl = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z- ]*"), Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%=-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    phoneNumber: ['', [Validators.minLength(12), Validators.maxLength(12),Validators.required,
      Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{6})([-\s\.]?[0-9]{3,4})')]],    gender: ['', [Validators.required]],
    address: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    personalUniqueCode: ['', [Validators.required]],
    userRole: ['', [Validators.required]],
    hashedPassword: ['', [Validators.required]]
  });

  ngOnInit(): void {
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
