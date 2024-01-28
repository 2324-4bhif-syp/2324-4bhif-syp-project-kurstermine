import { Component, Input } from '@angular/core';
import { Offer } from 'src/shared/models/offer';

@Component({
	selector: 'app-offer',
	templateUrl: './offer.component.html',
	styleUrl: './offer.component.css'
})
export class OfferComponent {
	@Input({required: true}) offer!: Offer;
}
