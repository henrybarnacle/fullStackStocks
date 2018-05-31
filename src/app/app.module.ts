import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AboutComponent } from './components/about/about.component';
import { StockService } from './services/stock.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';



const appRoutes: Routes = [
  {
    path: 'stocks',
    component: PortfolioComponent,
    canActivate:[AuthGuard],
    data: { title: 'Portfolio' }
  },
    {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'stock-details/:id',
    component: StockDetailComponent,
    data: { title: 'Stock Details' }
  },
  { path: '',
    redirectTo: 'stocks',
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
  { path: 'stockFinder',
    component: StockComponent,
    data: { title: 'Stock Finder'}
  },
  {path:'**', redirectTo: '' }

];

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    PortfolioComponent,
    AboutComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    StockDetailComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
      RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  )
  ],
  providers: [ StockService, ValidateService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
