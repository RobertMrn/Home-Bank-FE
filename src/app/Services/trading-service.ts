import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginService} from "./login-service";
import {results} from "../stock-trading/stock-trading.component";
import {RealTimePriceResponse, valuesChartTest} from "../chart/chart-component-custom.component";
import {PortfolioResult} from "../stock-trading/portofolio/portfolio.component";

export interface DetailsForTickerResult {
  results: string;
}

export interface LogoResult {
  meta: string[],
  url: string
}

@Injectable({providedIn: 'root'})
export class TradingService {
  requestParams = new HttpParams();
  public ticker: string = '';
  public realPrice: number = 0;

  constructor(private http: HttpClient, private logInService: LoginService) {
  }

  getLogoForTicker(ticker:string){
    return this.http.get<LogoResult>('https://twelve-data1.p.rapidapi.com/logo?symbol='+ticker,{
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'aaffc91b80msh256a1e5e49c6a2dp103f79jsned0b09c6bc6f',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    })

  }

  getDetailsForTicker(ticker: string){
    return this.http.get<DetailsForTickerResult>('https://api.polygon.io/v3/reference/tickers/'+ticker+'?apiKey=LPRXuQuJTNlHVt4Anzs7fA5pRzGNJMcu')
  }

  getAllTickers() {
    return this.http.get<results>('https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json', {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'aaffc91b80msh256a1e5e49c6a2dp103f79jsned0b09c6bc6f',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    })
  }

  getRealTimePrice(ticker: string) {
    return this.http.get<RealTimePriceResponse>('https://twelve-data1.p.rapidapi.com/price?symbol='+ticker+'&format=json&outputsize=30', {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'aaffc91b80msh256a1e5e49c6a2dp103f79jsned0b09c6bc6f',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    })
  }

  buyStock(amount: number, totallyBought: number, ticker: string) {
    return this.http.post('http://localhost:8080/addStockMarket', {
      userId: JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2] as unknown as number,
      ticker: ticker,
      quantity: amount,
      totallyBought: totallyBought
    })
  }

  sellStock(amount: number, totallyBought: number, ticker: string){
    return this.http.post('http://localhost:8080/sellStockMarket', {
      userId: JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2] as unknown as number,
      ticker: ticker,
      quantity: amount,
      totallyBought: totallyBought
    })
  }

  getBalance(){
    return this.http.get('http://localhost:8080/getOnlyBalance',{
      params: new HttpParams().set('userId', JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2] as unknown as number)
    })
  }

  getDataForChartDaily(ticker:string){
    return this.http.get<valuesChartTest>('https://twelve-data1.p.rapidapi.com/time_series?symbol='+ticker+'&interval=1day&outputsize=60&format=json',{
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'aaffc91b80msh256a1e5e49c6a2dp103f79jsned0b09c6bc6f',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    })
  }

  findAllStocksForOneClient(){
    return this.http.get<PortfolioResult[]>('http://localhost:8080/findAllStocksForOneClient',{
      params: new HttpParams().set('userId', JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2] as unknown as number)
    })
  }

  isStockInPortfolio(){
    this.requestParams = this.requestParams.set('userId', JSON.stringify(this.logInService.getDataFromToken(localStorage.getItem('response')!)).split(',')[2] as unknown as number);
    this.requestParams = this.requestParams.set('ticker', localStorage.getItem('ticker')!);
    return this.http.get('http://localhost:8080/isStockInPortfolio',{
      params: this.requestParams
    })
  }

}
