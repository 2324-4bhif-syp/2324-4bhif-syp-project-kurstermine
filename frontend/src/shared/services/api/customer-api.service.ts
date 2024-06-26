import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Customer, fromCustomerDto, set } from '@models';
import { ApiService } from '@services/api/api.service';
import { CustomerDto, fromCustomer } from '@models/dtos';

@Injectable({
    providedIn: 'root',
})
export class CustomerApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, 'customers');
    }

    public getAll() {
        this.http
            .get<CustomerDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((dtos) => {
                    return dtos.map<Customer>(fromCustomerDto);
                }),
            )
            .subscribe((customers) => {
                set((model) => {
                    if (model.customers.length === 0) {
                        model.customers = customers;
                    }
                });
            });
    }

    public getLoggedInCustomer() {
        this.http
            .get<CustomerDto>(`${this.url}/id`, {
                headers: this.headers,
            })
            .pipe(
                map((customer) => {
                    return fromCustomerDto(customer);
                }),
            )
            .subscribe((customer) => {
                set((model) => {
                    model.customer = customer;
                });
            });
    }

    public add(customer: Customer) {
        this.http
            .post<CustomerDto>(this.url, fromCustomer(customer), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((customer) => {
                    return fromCustomerDto(customer);
                }),
            )
            .subscribe((customer) => {
                set((model) => {
                    model.customer = customer;
                });
            });
    }
}
