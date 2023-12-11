import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Customer, fromCustomerDto } from '../../models/customer';
import { CustomerDto, fromCustomer } from '../../models/dtos/customer-dto';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService extends ApiService<Customer, CustomerDto>{
  constructor(http: HttpClient) {
    super(http, "customers", fromCustomerDto)
  }

  public getLoggedInCustomer() {
    return this.http.get<CustomerDto>(`${this.url}/name`, {
      headers: this.headers
    }).pipe(
      map(customer => {
        return fromCustomerDto(customer);
      })
    )
  }

  public add(customer: Customer): Observable<Customer> {
    return this.http.post<CustomerDto>(this.url, fromCustomer(customer), {
      headers: this.headers.set("Content-Type", "application/json")
    }).pipe(
      map(customer => {
        return fromCustomerDto(customer)
      })
    )
  }
}
