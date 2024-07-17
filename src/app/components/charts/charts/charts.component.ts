import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.getTransactions().pipe(
    catchError(error => {
      console.error('Error fetching transactions:', error);
      return throwError(error);
    })
  ).subscribe(transactions => {
    console.log('Transactions:', transactions);
    this.dataService.getCustomers().pipe(
      catchError(error => {
        console.error('Error fetching customers:', error);
        return throwError(error);
      })
    ).subscribe(customers => {
      console.log('Customers:', customers);
      const customerAmounts = this.calculateCustomerAmounts(transactions, customers);
      console.log('Customer Amounts:', customerAmounts); 
      this.createChart(customerAmounts);
    });
  });
}

calculateCustomerAmounts(transactions: any[], customers: any[]): { name: string, amount: number }[] {
  return customers.map(customer => {
    const customerTransactions = transactions.filter(transaction => {
      console.log(`Customer ID: ${customer.id}, Transaction Customer ID: ${transaction.customer_id}`); 
      return Number(transaction.customer_id) === Number(customer.id);
    });

    console.log(`Customer ID: ${customer.id}, Transactions:`, customerTransactions); 

    const totalAmount = customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return { name: customer.name, amount: totalAmount };
  });
}

createChart(customerAmounts: { name: string, amount: number }[]) {
  const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const canvas2 = document.getElementById('barChart') as HTMLCanvasElement;
  const ctx2 = canvas2.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: customerAmounts.map(ca => ca.name),
        datasets: [{
          data: customerAmounts.map(ca => ca.amount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Customer Transaction Amounts'
          }
        }
      }
    });
  }
  if (ctx2) {
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: customerAmounts.map(ca => ca.name),
        datasets: [{
          data: customerAmounts.map(ca => ca.amount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
   
      }
    });
  }
}
}