import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Service } from './service';
import { CustomerApiService } from './api/customer-api.service';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '../models/roles';

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends Service<Customer> {
    finished = false;

    constructor(protected api: CustomerApiService,
                protected keycloak: KeycloakService) {
        super();

        if(keycloak.getUserRoles().includes(Roles.Admin)) {
            this.api.getAll().subscribe({
                next: (customers) => {
                    super.add(...customers);
                    this.finished = true;
                    this.notifyListeners();
                },
            });

            return;
        }

        if(keycloak.getUserRoles().includes(Roles.Customer)) {
            this.getLoggedInCustomer().subscribe({
                next: (customer: Customer) => {
                    super.add(customer);
                    this.finished = true;
                    this.notifyListeners();
                },
            });
        }
    }

    override add(item: Customer): void {
        this.api.add(item).subscribe({
            next: (customer) => {
                super.add(customer);
            },
        });
    }

    getLoggedInCustomer(): Observable<Customer> {
        return this.api.getLoggedInCustomer();
    }

    notifyListeners() {
        this.finishedListeners.forEach((listener) => listener());
    }

    finishedListeners: (() => void)[] = [];
}
