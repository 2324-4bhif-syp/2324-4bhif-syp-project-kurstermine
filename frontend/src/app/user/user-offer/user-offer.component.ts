import { Component, Input } from '@angular/core';
import { Offer } from 'src/shared/models/offer';

@Component({
	selector: 'app-user-offer',
	templateUrl: './user-offer.component.html',
	styleUrl: './user-offer.component.css'
})
export class UserOfferComponent {
	@Input({required: true}) offer!: Offer;
}
