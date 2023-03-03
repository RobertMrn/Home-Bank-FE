import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomeCustomersComponent } from './home-customers/home-customers.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from "@angular/material/table";
import {Interceptor} from "./Services/interceptor";
import { NewLoanComponent } from './home-customers/new-loan/new-loan.component';
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import { PersonalDataComponent } from './home-customers/new-loan/personal-data/personal-data.component';
import { HomeAgentsComponent } from './home-agents/home-agents.component';
import { UserDetailsComponent } from './home-agents/user-details/user-details.component';
import {CookieService} from "ngx-cookie-service";
import { ContractDetailsComponent } from './home-agents/contract-details/contract-details.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { GreenDecisionComponent } from './green-decision/green-decision.component';
import { YellowDecisionComponent } from './yellow-decision/yellow-decision.component';
import { RedDecisionComponent } from './red-decision/red-decision.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NewUserComponent } from './new-user/new-user.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

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
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
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
    MatDialogModule
  ],
  exports:[],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi:true,

  }, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
