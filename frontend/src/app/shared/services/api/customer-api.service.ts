import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer, fromCustomerDto } from '../../models/customer';
import { CustomerDto, fromCustomer } from '../../models/dtos/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  protected http: HttpClient;
  protected url: string;
  protected headers: HttpHeaders;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = environment.apiUrl;
    this.headers = new HttpHeaders().set("Accept", "application/json");
  }

  public getAll(): Observable<Customer[]> {
    return this.http.get<CustomerDto[]>(`${this.url}/customers`, {
      headers: this.headers
    }).pipe(
      map(customers => {
          return customers.map<Customer>(fromCustomerDto);
      })
    )
  }

  public add(customer: Customer): Observable<Customer> {
    return this.http.post<CustomerDto>(`${this.url}/customers`, fromCustomer(customer), {
      headers: this.headers.set("Conent-Type", "application/json")
    }).pipe(
      map(customer => {
        return fromCustomerDto(customer)
      })
    )
  }
}
