import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationService } from './services/reservation.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HTTP_Interceptor } from './config/http_intercep';
import { JwtModule } from "@auth0/angular-jwt";
import { MapComponent } from './pages/map/map.component';
import { OrderComponent } from './pages/order/order.component';
import { registerLocaleData } from '@angular/common';
import local from '@angular/common/locales/th';
import { AdminComponent } from './pages/admin/admin.component';
registerLocaleData(local, 'th')
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CreateAccountComponent,
    MapComponent,
    OrderComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["*"],
        disallowedRoutes: [""],
      },
    }),
  ],
  providers: [
    ReservationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTP_Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
