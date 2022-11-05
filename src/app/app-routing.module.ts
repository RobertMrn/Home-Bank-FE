import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponentComponent} from "./login-component/login-component.component";
import {HomeCustomersComponent} from "./home-customers/home-customers.component";
import {CustomersGuard} from "./Services/CustomersGuard";

const routes: Routes = [
  {path: 'login', component:LoginComponentComponent},
  {path: 'homeCustomers', component:HomeCustomersComponent, canActivate:[CustomersGuard]},
  {path: '**', redirectTo:'login'},
  {path: '', redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
