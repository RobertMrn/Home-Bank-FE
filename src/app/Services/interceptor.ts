import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LoginService} from "./login-service";
import {catchError, Observable, throwError} from "rxjs";


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private logInService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.startsWith('https://api.polygon.io')){
      let clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer LPRXuQuJTNlHVt4Anzs7fA5pRzGNJMcu')});
      return next.handle(clonedRequest);
    }
    if (localStorage.getItem('jwtToken') === null) {
      let clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer ')});
      return next.handle(clonedRequest);
    } else {
      let clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')!))});
      return next.handle(clonedRequest).pipe(catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse) {
          if (errorResponse.status === 401) {
            this.logInService.isTokenExpired = 'Your session token has expired. Please log in again.'
            this.logInService.logOut();
          }
        }
        return throwError(() => new Error(errorResponse));
      }))
    }
  }

}
