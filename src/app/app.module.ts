import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FormsModule } from '@angular/forms';
import { ToUpperCasePipe } from './pipes/to-upper-case.pipe';
import { ChartsComponent } from './components/charts/charts/charts.component';
import { ChartModule , LineSeriesService , CategoryService } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    TransactionsComponent,
    ToUpperCasePipe,
    ChartsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule , 
    HttpClientModule ,
    FormsModule  , 
    ChartModule
    
  ],
  providers: [LineSeriesService , CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
