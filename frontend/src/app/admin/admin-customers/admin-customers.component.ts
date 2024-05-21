import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '@models';
import { RouterModule } from '@angular/router';
import { CustomerApiService } from '@services/api';
import { StoreService } from '@services/store.service';
import { distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [RouterModule, AsyncPipe],
    selector: 'app-admin-customers',
    templateUrl: './admin-customers.component.html',
    styleUrls: ['./admin-customers.component.css'],
})
export class AdminCustomersComponent implements OnInit {
    protected newCustomer: Customer;

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => model.customers),
        distinctUntilChanged(),
    );

    private customerApiService = inject(CustomerApiService);

    constructor() {
        this.newCustomer = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    add() {
        this.customerApiService.add(this.newCustomer);

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
