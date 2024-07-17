import { Customers } from './../../interfaces/customers';
import { Transac } from './../../interfaces/transac';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient : HttpClient ) {}
  getCustomers():Observable<Customers[]>{
    return this._HttpClient.get<Customers[]>(`http://localhost:3000/customers`);
  }
  getTransactions():Observable<Transac[]>{
    return this._HttpClient.get<Transac[]>(`http://localhost:3000/transactions`)
  }
}
