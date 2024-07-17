import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Customers } from 'src/interfaces/customers';
import { Transac } from 'src/interfaces/transac';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnChanges {
  trans: Transac[] = [];
  filterTrans: Transac[] = [];
  errorMassge: string = '';
  @Input() recievedIdFromCustomer: number = 0;
  @Input() recievInputValue: any = "";
  @Input() recieveCustomersDat : Customers [] = []; 
  constructor(private _DataService: DataService) { }
  ngOnChanges(): void {
    this.filterCustomer() ; 
    this.changeSearch();
    // console.log('customers' , this.recieveCustomersDat);
    
   
  }
  ngOnInit(): void {
    this.getTrans() ; 
   
  }
  private getTrans(): void {
    this._DataService.getTransactions().subscribe({
      next: (res: Transac[]) => {
        // console.log(res)
        this.trans = res;
        this.filterTrans = this.trans
        // console.log(this.trans)
      },
      error: (err) => {
        console.log(err)
        this.errorMassge = err;
      }
    })
  }
  private filterCustomer(): void {
    if (this.recievedIdFromCustomer == 0) {
      this.filterTrans = this.trans
    } else {

      this.filterTrans = this.trans.filter((custom) => custom.customer_id == this.recievedIdFromCustomer)
    }
    // console.log(this.filterTrans)
  }
  private changeSearch():void{
      // console.log(typeof this.recievInputValue , this.recievInputValue);
      if(this.recievInputValue){
        this.filterTrans = this.trans.filter((amount)=> amount.amount == + this.recievInputValue) ;
          
      }
      
    
  }
}
