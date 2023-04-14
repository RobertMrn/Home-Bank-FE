import {Component, OnInit, ViewChild} from '@angular/core';
import {TradingService} from "../../Services/trading-service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router, RouterOutlet} from "@angular/router";

export interface PortfolioResult {
  stockId: number,
  ticker: string,
  quantity: number,
  totallyBought: number
}

@Component({
  selector: 'app-portofolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  displayedColumns: string[] = ['stockId', 'ticker', 'quantity', 'totallyBought'];
  dataSource = new MatTableDataSource<PortfolioResult>();

  constructor(private tradingService: TradingService, private route: Router) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.tradingService.findAllStocksForOneClient().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  getTickerInfo(ticker: any) {
    localStorage.setItem('ticker', ticker);
    this.tradingService.ticker = ticker;
    this.route.navigate(['chart']);
  }
}
