import {Component, OnInit} from '@angular/core';
import { CustomerService } from '../../../shared/services/customer.service';
import { Customer } from '../../../shared/models/customer';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {CustomerApiService} from "../../../shared/services/api/customer-api.service";

@Component({
    standalone: true,
    imports: [MatListModule, MatIconModule, RouterModule],
    selector: 'app-admin-customers',
    templateUrl: './admin-customers.component.html',
    styleUrls: ['./admin-customers.component.css'],
})
export class AdminCustomersComponent implements OnInit {
    protected newCustomer: Customer;

    constructor(
        protected customerService: CustomerService,
        protected customerApiService: CustomerApiService
    ) {
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

    ngOnInit(): void {
        this.customerApiService.getAll();
    }
}
