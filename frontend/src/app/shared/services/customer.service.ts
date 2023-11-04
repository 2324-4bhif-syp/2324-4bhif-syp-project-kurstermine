import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, catchError, map, tap, timeInterval } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url = 'http://localhost:8080/customers';
  private customers: Customer[] = [];

  constructor(private http: HttpClient) {}

  public async getCustomers(): Promise<Customer[]> {
    let response = await fetch(this.url);
    let data = await response.json();
    this.customers = data.map((item: any) => {
      let customer: Customer = { 
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        dateOfBirth: new Date(item.dateOfBirth)
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
