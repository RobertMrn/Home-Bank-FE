import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent} from "ng-apexcharts";
import {TradingService} from "../Services/trading-service";
import {
  TransactionModalComponentForBuying
} from "./transaction-modal-for-buying/transaction-modal-component-for-buying.component";
import {MatDialog} from "@angular/material/dialog";
import {
  TransactionModalForSellingComponent
} from "./transaction-modal-for-selling/transaction-modal-for-selling.component";
import {Article} from "./Articles";
import {NgbAlertConfig} from "@ng-bootstrap/ng-bootstrap";

export type ChartOptionsDaily = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsWeekly = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsMonthly = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsHourly = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


export interface valuesChartTest {
  values: string[]
}

export interface RealTimePriceResponse {
  price: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart-component-custom.component.html',
  styleUrls: ['./chart-component-custom.component.css']
})

export class ChartComponentCustom implements OnInit {
  articles: Article[] = [];
  click = false;
  @ViewChild("chart") chart!: ChartComponent;

  isStockInPortfolioVar = false;
  chartOptionsDaily!: Partial<ChartOptionsDaily>;
  chartOptionsMonthly!: Partial<ChartOptionsMonthly>;
  chartOptionsWeekly!: Partial<ChartOptionsWeekly>;
  chartOptionsHourly!: Partial<ChartOptionsHourly>;
  realTimePrice: string = '';
  highestPrice: number = 0;
  lowestPrice: number = 0;
  openPrice: number = 0;
  previousClose: number = 0;
  nameOfCompany: string = '';
  marketCap: string = '';
  description: string = '';
  webUrl: string = '';
  logo: string = '';
  ticker = localStorage.getItem('ticker');

  constructor(public tradingService: TradingService, private dialog: MatDialog) {}

  openLink(link: string) {
    window.open(link, '_blank');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.click = true;
    }, 1000);
    this.getDataForChartDaily();
    this.getDataForChartMonthly();
    this.getDataForChartWeekly();

    // this.tradingService.getDataForChartHourly(localStorage.getItem('ticker')!).subscribe({
    //   next: value => {
    //     this.chartOptionsHourly = {
    //       series: this.getSeries(value),
    //       chart: {
    //         type: "candlestick",
    //         height: 350
    //       },
    //       title: {
    //         text: "Chart Hourly",
    //         align: "center"
    //       },
    //       xaxis: {
    //         type: "datetime"
    //       },
    //       yaxis: {
    //         tooltip: {
    //           enabled: true
    //         }
    //       }
    //     };
    //   }
    // })

    this.getRealTimePrice();
    this.getTickerDetails();
    this.isStockInPortfolio();
    this.getLogoForTicker();
    this.getTopNewsForTicker();

  }


  private getDataForChartWeekly() {
    this.tradingService.getDataForChartWeekly(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        this.chartOptionsWeekly = {
          series: this.getSeries(value),
          chart: {
            type: "candlestick",
            height: 350
          },
          title: {
            text: "Chart Weekly",
            align: "center"
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        };
      }
    })
  }

  private getDataForChartMonthly() {
    this.tradingService.getDataForChartMonthly(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        this.chartOptionsMonthly = {
          series: this.getSeries(value),
          chart: {
            type: "candlestick",
            height: 350
          },
          title: {
            text: "Chart Monthly",
            align: "center"
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        };

      }
    })
  }

  private getDataForChartDaily() {
    this.tradingService.getDataForChartDaily(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        this.highestPrice = Number(JSON.stringify(value.values[0]).split(',')[2].split(':')[1].replace(/['"]+/g, ''));
        this.lowestPrice = Number(JSON.stringify(value.values[0]).split(',')[3].split(':')[1].replace(/['"]+/g, ''));
        this.openPrice = Number(JSON.stringify(value.values[0]).split(',')[1].split(':')[1].replace(/['"]+/g, ''));
        this.previousClose = Number(JSON.stringify(value.values[0]).split(',')[4].split(':')[1].replace(/['"]+/g, ''));
        this.chartOptionsDaily = {
          series: this.getSeries(value),
          chart: {
            type: "candlestick",
            height: 350
          },
          title: {
            text: "Chart Daily",
            align: "center"
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        };
      }
    })
  }

  getRealTimePrice() {
    this.tradingService.getRealTimePrice(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        this.realTimePrice = value.price;
        this.tradingService.realPrice = value.price as unknown as number;
      }
    })
  }

  getLogoForTicker() {
    this.tradingService.getLogoForTicker(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        this.logo = value.url;
      }
    })
  }

  getTickerDetails() {
    this.tradingService.getDetailsForTicker(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        this.description = JSON.stringify(value.results).split('}').filter(x => x.includes('description'))[0].replace(/\"/g, '').replace(',description:', '');
        this.nameOfCompany = JSON.stringify(value.results).split(',').filter(x => x.includes('name'))[0].replace(/\"/g, '').split(':')[1];
        this.marketCap = JSON.stringify(value.results).split(',').filter(x => x.includes('market_cap'))[0].replace(/\"/g, '').replace('market_cap:', '') + '$';
        this.webUrl = JSON.stringify(value.results).split(',').filter(x => x.includes('homepage_url'))[0].replace(/\"/g, '').replace('homepage_url:', '');
      }
    })
  }

  getTopNewsForTicker() {
    this.tradingService.getTopNewsForTicker(localStorage.getItem('ticker')!).subscribe({
      next: value => {
        for (let i = 0; i < value.results.length; i++) {
          let currentValue = JSON.stringify(value.results[i]);
          let newArticle = new Article(
            currentValue.split(',').filter(x => x.includes('title'))[0].replace(/\"/g, '').split(':')[1],
            currentValue.split(',').filter(x => x.includes('author'))[0].replace(/\"/g, '').split(':')[1],
            currentValue.split(',').filter(x => x.includes('article_url'))[0].replace(/\"/g, '').replace('article_url:', ''),
            currentValue.split(',').filter(x => x.includes('image_url'))[0].replace(/\"/g, '').replace('image_url:', ''),
          )
          this.articles.push(newArticle);
        }
      }
    })
  }

  startBuyTransaction() {
    const dialogRef = this.dialog.open(TransactionModalComponentForBuying);
  }

  startSellTransaction() {
    const dialogRef = this.dialog.open(TransactionModalForSellingComponent);

  }

  isStockInPortfolio() {
    this.tradingService.isStockInPortfolio().subscribe({
      next: value => {
        this.isStockInPortfolioVar = !!value;
      }
    })
  }

  private getSeries(value: valuesChartTest) {
    return [
      {
        name: "candle",
        data: [
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[0]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[0]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[0]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[0]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[0]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[1]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[1]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[1]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[1]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[1]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[2]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[2]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[2]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[2]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[2]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[3]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[3]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[3]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[3]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[3]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[4]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[4]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[4]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[4]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[4]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[5]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[5]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[5]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[5]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[5]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[6]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[6]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[6]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[6]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[6]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[7]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[7]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[7]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[7]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[7]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[8]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[8]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[8]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[8]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[8]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          }
          ,
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[9]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[9]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[9]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[9]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[9]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[10]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[10]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[10]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[10]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[10]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[11]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[11]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[11]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[11]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[11]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[12]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[12]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[12]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[12]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[12]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[13]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[13]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[13]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[13]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[13]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high ow close
            x: new Date(JSON.stringify(value.values[14]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[14]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[14]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[14]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[14]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[15]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[15]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[15]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[15]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[15]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[16]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[16]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[16]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[16]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[16]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[17]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[17]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[17]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[17]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[17]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[18]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[18]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[18]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[18]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[18]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[19]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[19]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[19]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[19]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[19]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[20]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[20]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[20]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[20]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[20]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[21]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[21]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[21]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[21]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[21]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[22]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[22]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[22]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[22]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[22]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[23]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[23]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[23]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[23]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[23]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[24]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[24]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[24]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[24]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[24]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[25]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[25]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[25]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[25]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[25]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[26]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[26]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[26]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[26]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[26]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[27]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[27]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[27]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[27]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[27]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[28]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[28]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[28]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[28]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[28]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[29]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[29]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[29]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[29]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[29]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[30]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[30]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[30]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[30]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[30]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[31]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[31]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[31]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[31]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[31]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[32]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[32]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[32]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[32]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[32]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[33]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[33]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[33]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[33]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[33]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[34]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[34]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[34]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[34]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[34]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[35]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[35]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[35]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[35]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[35]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[36]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[36]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[36]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[36]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[36]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[37]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[37]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[37]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[37]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[37]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[38]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[38]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[38]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[38]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[38]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[39]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[39]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[39]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[39]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[39]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[40]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[40]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[40]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[40]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[40]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[41]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[41]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[41]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[41]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[41]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[42]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[42]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[42]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[42]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[42]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[43]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[43]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[43]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[43]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[43]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[44]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[44]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[44]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[44]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[44]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[45]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[45]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[45]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[45]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[45]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[46]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[46]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[46]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[46]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[46]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[47]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[47]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[47]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[47]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[47]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[48]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[48]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[48]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[48]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[48]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[49]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[49]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[49]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[49]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[49]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[50]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[50]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[50]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[50]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[50]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[51]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[51]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[51]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[51]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[51]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[52]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[52]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[52]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[52]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[52]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[53]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[53]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[53]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[53]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[53]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[54]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[54]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[54]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[54]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[54]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[55]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[55]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[55]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[55]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[55]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[56]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[56]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[56]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[56]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[56]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[57]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[57]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[57]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[57]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[57]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[58]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[58]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[58]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[58]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[58]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          },
          {
            //open high low close
            x: new Date(JSON.stringify(value.values[59]).split(',')[0].split(':')[1]),
            y: [JSON.stringify(value.values[59]).split(',')[1].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[59]).split(',')[2].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[59]).split(',')[3].split(':')[1].replace(/['"]+/g, ''),
              JSON.stringify(value.values[59]).split(',')[4].split(':')[1].replace(/['"]+/g, '')]
          }
        ]
      }
    ];
  }


}


