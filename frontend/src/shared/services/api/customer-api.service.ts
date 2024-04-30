import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { set } from 'src/shared/models/model';
import { Customer, fromCustomerDto } from '../../models/customer';
import { CustomerDto, fromCustomer } from '../../models/dtos/customer-dto';
import { ApiService } from './api.service';

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
            .subscribe(customers => {
                set(model => {
                    model.customers = customers;
                })
            })
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
            .subscribe(customer => {
                set(model => {
                    model.customer = customer;
                })
            })
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
            .subscribe(customer => {
                set(model => {
                    model.customer = customer
                })
            });
    }
}
