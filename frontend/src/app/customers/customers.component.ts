import { Component } from '@angular/core';
import { CustomerService } from '../shared/services/customer.service';
import { Customer } from '../shared/models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  private customerService: CustomerService;
  protected customers: Customer[];
  protected newCustomer: Customer;

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
    this.customers = [];
    this.init();

    this.newCustomer = {
      first_name:"",
      last_name:"",
      date_of_birth: new Date(),
      email:""
    }
  }

  async init() {
    this.customers = await this.customerService.getCustomers();
    console.debug(this.customerService);
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
    this.customerService.addCustomer(this.newCustomer);
    this.newCustomer = {
      first_name:"",
      last_name:"",
      date_of_birth:new Date(),
      email:""
    }
  }
}
