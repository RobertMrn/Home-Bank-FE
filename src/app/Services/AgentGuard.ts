import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {LoginService} from "./login-service";
import {map, Observable, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class AgentGuard implements CanActivate {
  constructor(private logInService: LoginService, private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.logInService.logInAgent.pipe(
      take(1),
      map(user=>{
        const isLogged = !!user;
        if(isLogged){
          return true;
        }
        this.logInService.logOut();
        return this.route.createUrlTree(['/login']);
      })
    )
  }

}
