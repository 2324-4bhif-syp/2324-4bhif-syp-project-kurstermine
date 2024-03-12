import { Component } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer.service';
import { Customer } from '../../../shared/models/customer';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [MatListModule, MatIconModule, RouterModule],
    selector: 'app-admin-customers',
    templateUrl: './admin-customers.component.html',
    styleUrls: ['./admin-customers.component.css'],
})
export class AdminCustomersComponent {
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
