import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url = 'http://localhost:8080/customers';
  private customers: Customer[] = [];

  public async getCustomers(): Promise<Customer[]> {
    let response = await fetch(this.url);
    let data = await response.json();
    this.customers = data.map((item: any) => {
      let customer: Customer = {
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        date_of_birth: new Date(item.date_of_birth)
      }
      return customer;
    });

    return this.customers
  }

  public async addCustomer(customer: Customer) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    try {
      let response = await fetch(this.url, {
        body: JSON.stringify(customer),
        headers: headers,
        method: "POST"
      });

      if(response.status !== 201) {
        alert("Error adding customer!");
        return;
      }
    } catch (error) {
      alert("Error adding customer!");
    }

    this.customers.push(customer);
  }
}
