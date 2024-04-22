import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/shared/services/customer.service';
import { PurchaseService } from 'src/shared/services/purchase.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import {AdminPacketComponent} from "../admin-packet/admin-packet.component";
import {Customer} from "../../../shared/models/customer";

@Component({
  selector: 'app-admin-customer',
  standalone: true,
    imports: [MatListModule, MatExpansionModule, MatIconModule, MatChipsModule, MatCardModule, AdminPacketComponent],
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.css'
})
export class AdminCustomerComponent {
  constructor(
    protected customerService: CustomerService,
    protected purchaseService: PurchaseService,
    private route: ActivatedRoute,
  ) {

  }

  public id = this.route.snapshot.params['id'];

  protected get customer() {
    let customer: Customer = this.customerService.get(c => c.id === this.id)[0];
    if (!customer) {
      return undefined;
    }
    return customer;
  }

  protected get purchases() {
    return this.purchaseService.get(p => p.customer.id === this.id);
  }
}
