import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Service } from './service';
import { CustomerApiService } from './api/customer-api.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends Service<Customer> {

  protected api: CustomerApiService;
  finished = false;

  constructor(customerApiService: CustomerApiService) {
    super();

    this.api = customerApiService;

    this.api.getAll().subscribe({
      next: (customers) => {
        super.add(...customers);
        this.finished = true;
        this.notifyListeners();
      }
    });
  }

  override add(item: Customer): void {
    this.api.add(item).subscribe({
      next: (customer => {
        super.add(customer);
      })
    });
  }

  getLoggedInCustomer(): Observable<Customer> {
    return this.api.getLoggedInCustomer();
  }

  notifyListeners() {
    this.finishedListeners.forEach(listener => listener());
  }

  finishedListeners: (() => void)[] = [];
}
