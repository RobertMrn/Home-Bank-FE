import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponentComponent} from './login-component/login-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HomeCustomersComponent} from './home-customers/home-customers.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from "@angular/material/table";
import {Interceptor} from "./Services/interceptor";
import {NewLoanComponent} from './home-customers/new-loan/new-loan.component';
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {PersonalDataComponent} from './home-customers/new-loan/personal-data/personal-data.component';
import {HomeAgentsComponent} from './home-agents/home-agents.component';
import {UserDetailsComponent} from './home-agents/user-details/user-details.component';
import {CookieService} from "ngx-cookie-service";
import {ContractDetailsComponent} from './home-agents/contract-details/contract-details.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {GreenDecisionComponent} from './green-decision/green-decision.component';
import {YellowDecisionComponent} from './yellow-decision/yellow-decision.component';
import {RedDecisionComponent} from './red-decision/red-decision.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {NewUserComponent} from './new-user/new-user.component';
import {DialogComponent} from './dialog-for-delete-users/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ChatBotComponent} from './chat-bot/chat-bot.component';
import {NgxChatboxModule} from "ngx-chatbox";
import {ForgotPasswordComponent} from './login-component/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './login-component/forgot-password/new-password/change-password.component';
import {DialogForNewUserComponent} from './new-user/dialog-for-new-user/dialog-for-new-user.component';
import {StockTradingComponent} from './stock-trading/stock-trading.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ChartComponentCustom} from './chart/chart-component-custom.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { TransactionModalComponentForBuying } from './chart/transaction-modal-for-buying/transaction-modal-component-for-buying.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import { PortfolioComponent } from './stock-trading/portofolio/portfolio.component';
import { TransactionModalForSellingComponent } from './chart/transaction-modal-for-selling/transaction-modal-for-selling.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import { AddMoneyComponent } from './add-money/add-money.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { DialogForChangingPasswordComponent } from './login-component/dialog-for-changing-password/dialog-for-changing-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HeaderComponent,
    HomeCustomersComponent,
    NewLoanComponent,
    PersonalDataComponent,
    HomeAgentsComponent,
    UserDetailsComponent,
    ContractDetailsComponent,
    ProfilePageComponent,
    GreenDecisionComponent,
    YellowDecisionComponent,
    RedDecisionComponent,
    HomeAdminComponent,
    NewUserComponent,
    DialogComponent,
    ChatBotComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    DialogForNewUserComponent,
    StockTradingComponent,
    ChartComponentCustom,
    TransactionModalComponentForBuying,
    PortfolioComponent,
    TransactionModalForSellingComponent,
    AddMoneyComponent,
    DialogForChangingPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxChatboxModule,
    MatAutocompleteModule,
    BrowserModule,
    NgApexchartsModule,
    FormsModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    NgbAlertModule,
    MatDatepickerModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,

    }
    , CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
