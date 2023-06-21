import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponentComponent} from "./login-component/login-component.component";
import {HomeCustomersComponent} from "./home-customers/home-customers.component";
import {NewLoanComponent} from "./home-customers/new-loan/new-loan.component";
import {LoginGuard} from "./Services/loginGuard";
import {PersonalDataComponent} from "./home-customers/new-loan/personal-data/personal-data.component";
import {HomeAgentsComponent} from "./home-agents/home-agents.component";
import {UserDetailsComponent} from "./home-agents/user-details/user-details.component";
import {ContractDetailsComponent} from "./home-agents/contract-details/contract-details.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {GreenDecisionComponent} from "./green-decision/green-decision.component";
import {YellowDecisionComponent} from "./yellow-decision/yellow-decision.component";
import {RedDecisionComponent} from "./red-decision/red-decision.component";
import {CustomersGuard} from "./Services/CustomersGuard";
import {AgentGuard} from "./Services/AgentGuard";
import {HomeAdminComponent} from "./home-admin/home-admin.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {ForgotPasswordComponent} from "./login-component/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./login-component/forgot-password/new-password/change-password.component";
import {StockTradingComponent} from "./stock-trading/stock-trading.component";
import {ChartComponentCustom} from "./chart/chart-component-custom.component";
import {PortfolioComponent} from "./stock-trading/portofolio/portfolio.component";
import {AddMoneyComponent} from "./add-money/add-money.component";

const routes: Routes = [
  {path: 'login', component: LoginComponentComponent, canActivate: [LoginGuard]},
  {path: 'homeCustomers', component: HomeCustomersComponent, canActivate: [CustomersGuard]},
  {path: 'newLoan', component: NewLoanComponent},
  {path: 'personalData', component: PersonalDataComponent},
  {path: 'homeAgents', component: HomeAgentsComponent, canActivate:[AgentGuard]},
  {path: 'homeAdmin', component: HomeAdminComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'resetPassword', component: ForgotPasswordComponent},
  {path: 'newPassword', component: ChangePasswordComponent},
  {path: 'userDetails', component: UserDetailsComponent},
  {path: 'contractDetails', component: ContractDetailsComponent},
  {path: 'profilePage', component: ProfilePageComponent},
  {path: 'addMoney', component: AddMoneyComponent},
  {path: 'stockTrading', component: StockTradingComponent},
  {path: 'chart', component: ChartComponentCustom},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'greenDecision', component: GreenDecisionComponent},
  {path: 'yellowDecision', component: YellowDecisionComponent},
  {path: 'redDecision', component: RedDecisionComponent},
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
