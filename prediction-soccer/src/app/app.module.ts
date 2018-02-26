import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status/status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AlertNotificationComponent } from './shared/alert-notification/alert-notification.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Services
import { CustomHttpService } from './services/custom-http.service';
import { AlertNotificationService } from './services/alert-notification.service';
import { StatusFormComponent } from './status/status-form/status-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    StatusComponent,
    DashboardComponent,
    LayoutComponent,
    PageNotFoundComponent,
    AlertNotificationComponent,
    StatusFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CustomHttpService,
    AlertNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
