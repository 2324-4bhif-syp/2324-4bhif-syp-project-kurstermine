import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPacketComponent } from '@components/admin/admin-packet/admin-packet.component';
import { Customer } from '@models';
import { StoreService } from '@services';
import { map, distinctUntilChanged } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-admin-customer',
    standalone: true,
    imports: [AdminPacketComponent, AsyncPipe],
    templateUrl: './admin-customer.component.html',
    styleUrl: './admin-customer.component.css',
})
export class AdminCustomerComponent {
    private id = inject(ActivatedRoute).snapshot.params['id'];

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => ({
            customer: model.customer,
            purchases: model.purchases.filter(
                (purchase) => purchase.customer.id === this.id,
            ),
        })),
        distinctUntilChanged(),
    );
}
