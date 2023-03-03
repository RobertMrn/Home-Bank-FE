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

const routes: Routes = [
  {path: 'login', component: LoginComponentComponent, canActivate: [LoginGuard]},
  {path: 'homeCustomers', component: HomeCustomersComponent, canActivate: [CustomersGuard]},
  {path: 'newLoan', component: NewLoanComponent},
  {path: 'personalData', component: PersonalDataComponent},
  {path: 'homeAgents', component: HomeAgentsComponent, canActivate:[AgentGuard]},
  {path: 'homeAdmin', component: HomeAdminComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'userDetails', component: UserDetailsComponent},
  {path: 'contractDetails', component: ContractDetailsComponent},
  {path: 'profilePage', component: ProfilePageComponent},
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
