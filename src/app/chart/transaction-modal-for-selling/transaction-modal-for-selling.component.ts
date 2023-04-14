import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TradingService} from "../../Services/trading-service";

@Component({
  selector: 'app-transaction-modal-for-selling',
  templateUrl: './transaction-modal-for-selling.component.html',
  styleUrls: ['./transaction-modal-for-selling.component.css']
})
export class TransactionModalForSellingComponent implements OnInit {
  moneyInWallet: number = 0;
  currentPrice: number = 0;
  isSold = false;

  constructor(private formBuilder: FormBuilder, public tradingService: TradingService) {
    this.currentPrice = this.tradingService.realPrice;
  }

  transactionForm = this.formBuilder.group({
    amount: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.tradingService.getBalance().subscribe({
      next: value => {
        console.log(JSON.stringify(value));
        this.moneyInWallet = Number(value);
      }
    })
  }

  convertAmountToNumber(amount: any) {
    return Number(amount) * this.currentPrice;
  }

  onSubmit() {
      this.tradingService.sellStock(Number(this.transactionForm.get('amount')?.value), this.convertAmountToNumber(this.transactionForm.get('amount')?.value),
        localStorage.getItem('ticker')!).subscribe();
      this.tradingService.getBalance().subscribe({
        next: value => {
          this.moneyInWallet = Number(value);
        }
      })

  }


}
