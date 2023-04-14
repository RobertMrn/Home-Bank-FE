import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TradingService} from "../../Services/trading-service";
import {map, Observable, Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-transaction-modal-for-buying',
  templateUrl: './transaction-modal-component-for-buying.component.html',
  styleUrls: ['./transaction-modal-component-for-buying.component.css']
})
export class TransactionModalComponentForBuying implements OnInit {
  moneyInWallet: number = 0;
  currentPrice: number = 0;
  timerSubscription!: Subscription;

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

  onSubmit() {
    this.tradingService.buyStock(Number(this.transactionForm.get('amount')?.value), this.convertAmountToNumber(this.transactionForm.get('amount')?.value),
      localStorage.getItem('ticker')!).subscribe();
    this.tradingService.getBalance().subscribe({
      next: value => {
        this.moneyInWallet = Number(value);
      }
    })
  }


  convertAmountToNumber(amount: any) {
    return Number(amount) * this.currentPrice;
  }

}
