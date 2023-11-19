import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Service } from './service';
import { CustomerApiService } from './api/customer-api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends Service<Customer> {
 
  protected api: CustomerApiService;

  constructor(customerApiService: CustomerApiService) {
    super();

    this.api = customerApiService;

    this.api.getAll().subscribe({
      next: (customers) => {
        super.add(...customers)
      }
    })
  }

  override add(item: Customer): void {
    this.api.add(item).subscribe({
      next: (customer => {
        super.add(customer);
      })
    });
  }
}
