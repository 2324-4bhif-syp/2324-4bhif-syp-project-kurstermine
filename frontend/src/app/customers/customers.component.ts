import { Component } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from '../../shared/models/customer';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
    protected customerService: CustomerService;
    protected newCustomer: Customer;

    constructor(customerService: CustomerService) {
        this.customerService = customerService;
        this.newCustomer = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    add() {
        this.customerService.add(this.newCustomer);

        this.newCustomer = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }
}
