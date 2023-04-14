import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TradingService} from "../Services/trading-service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs";

export interface results {
  data: string[]
}


@Component({
  selector: 'app-stock-trading',
  templateUrl: './stock-trading.component.html',
  styleUrls: ['./stock-trading.component.css']
})
export class StockTradingComponent implements OnInit {
  dataSource: MatTableDataSource<string> = new MatTableDataSource<string>();
  displayedColumns: string[] = ['symbol', 'name', 'currency', 'exchange', 'type', 'mic_code', 'country'];
  options: string[] = [];
  filteredOptions: string[] = [];
  formGroup = this.fb.group({
    'ticker': ['']
  })


  filterData(enteredData: string) {
    this.filteredOptions = this.options.filter(item => {
      return String(item).indexOf(enteredData.toUpperCase()) > -1
    })
  }


  constructor(private fb: FormBuilder, private tradingService: TradingService, private route: Router) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getAllTickers();
  }


  getAllTickers() {
    this.tradingService.getAllTickers().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.data);
        this.dataSource.paginator = this.paginator;
        for (let i = 0; i < value.data.length; i++) {
          this.options.push(JSON.stringify(value.data[i]).split(',')[0].split(':"')[1]
            .split('"')[0]);
        }
        this.formGroup.get('ticker')!.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(response => {
            if (response && response.length) {
              this.filterData(response);
            } else {
              this.filteredOptions = [];
            }
          })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getTickerInfo(ticker: any) {
    localStorage.setItem('ticker', ticker);
    this.tradingService.ticker = ticker;
    this.route.navigate(['chart']);
  }
}
