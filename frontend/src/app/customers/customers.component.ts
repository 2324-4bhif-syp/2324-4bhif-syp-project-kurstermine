import { Component } from '@angular/core';
import { CustomerService } from '../shared/services/customer.service';
import { Customer } from '../shared/models/customer';

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
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      email: ""
    }
  }

  parseDate(eventdate: Event): Date {
    const dateString = (eventdate.target as HTMLInputElement).value;

    let date = new Date();
    if(dateString) {
      date = new Date(dateString);
    }

    return date;
  }

  add() {
    this.customerService.add(this.newCustomer);

    this.newCustomer = {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      email: ""
    }
  }
}
