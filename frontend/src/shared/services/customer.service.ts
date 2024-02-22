import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerApiService } from './api/customer-api.service';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '../models/roles';
import {ReplayBaseService} from "./replay-base-service";

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends ReplayBaseService<Customer> {
    finished = false;

    constructor(protected api: CustomerApiService,
                protected keycloak: KeycloakService) {
        super(api, keycloak.getUserRoles().includes(Roles.Admin) ?
                api.getAll : api.getLoggedInCustomer,
            keycloak.getUserRoles().includes(Roles.Admin) ?
                (customers) => super.add(...customers) : (customer: Customer) => super.add(customer));
    }

    override add(item: Customer): void {
        this.api.add(item).subscribe({
            next: (customer) => {
                super.add(customer);
            },
        });
    }
}
