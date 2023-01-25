import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { OrderComponent } from './pages/order/order.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'create-account', component:CreateAccountComponent},
  {path: 'map', component: MapComponent,canActivate:[AuthGuard]},
  {path: 'order', component: OrderComponent,canActivate:[AuthGuard]},
  {
    path: 'admin', component: AdminComponent,
    canActivate:[AuthGuard],
    data : {
      role : '1'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
