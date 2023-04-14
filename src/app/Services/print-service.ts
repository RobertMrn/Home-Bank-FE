import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {catchError, map, throwError} from "rxjs";


@Injectable({providedIn: 'root'})
export class PrintService{
  requestParams = new HttpParams();

  constructor(private http: HttpClient) {
  }

  getContractPrinted(){
    this.requestParams = this.requestParams.set('contractId', jwt_decode(localStorage.getItem('contractId')!));
    return this.http.get<Blob>('http://localhost:8080/generateContractPDF',{
      params: this.requestParams,
      responseType: 'blob' as 'json'
    }).pipe(map(res=> new Blob([res],{type:'application/pdf'})),
      catchError(err => {
        return throwError(()=> new Error(err));
      }))

  }


}
