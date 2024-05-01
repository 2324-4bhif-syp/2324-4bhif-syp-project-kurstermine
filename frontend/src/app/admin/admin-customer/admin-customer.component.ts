import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AdminPacketComponent } from "@components/admin/admin-packet/admin-packet.component";
import { Customer } from "@models";
import { StoreService } from '@services';
import { map, distinctUntilChanged } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-customer',
  standalone: true,
  imports: [MatListModule, MatExpansionModule, MatIconModule, MatChipsModule, MatCardModule, AdminPacketComponent, AsyncPipe],
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.css'
})
export class AdminCustomerComponent {

  private id = inject(ActivatedRoute).snapshot.params['id'];

  protected viewModel = inject(StoreService)
        .store
        .pipe(
            map(model => ({
                customer: model.customer,
                purchases: model.purchases.filter(purchase => purchase.customer.id === this.id),
            })),
            distinctUntilChanged(),
        );
}
