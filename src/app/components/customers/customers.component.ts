import { Customers } from './../../../interfaces/customers';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
customs:Customers[] = [] ; 
InputValue:any = '';
idCustomer:number = 0 ; 
errorMassege:string = '' 
  constructor(private _DataService:DataService ){}

ngOnInit(): void {
    this.getCustoms()
}
private getCustoms():void{
  this._DataService.getCustomers().subscribe({
    next :(res : Customers[])=>{
      // console.log(res)
      this.customs = res;
      console.log( this.customs)
    } , 
    error:(err)=>{
      console.log(err)
      this.errorMassege = err

    }  
  })
}

}
