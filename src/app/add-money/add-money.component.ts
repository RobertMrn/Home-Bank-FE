import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RetrieveLoansService} from "../Services/retrieve-loans-service";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  addSuccess = false;
  addFailed = false;

  constructor(private formBuilder: FormBuilder, public retrieveLoansService: RetrieveLoansService) {
  }

  addMoneyControl = this.formBuilder.group({
    amount: ['', [Validators.required]],
    cardNumber: ['', [Validators.required, Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$")]],
    expiryDate: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
  });

  currentDate = new Date();

  onSubmit() {
    this.retrieveLoansService.addCustomerBalance(this.addMoneyControl).subscribe({
      next: value => {
        this.addSuccess = true;
        setTimeout(()=>{
          this.addSuccess = false;
        }, 1500)
      },
      error: err => {
        this.addFailed = true;
        setTimeout(()=>{
          this.addFailed = true;
        }, 1500)
      }
    })
  }

}
