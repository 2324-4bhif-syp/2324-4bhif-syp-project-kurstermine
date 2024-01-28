import { Component } from '@angular/core';
import { PacketApiService } from 'src/shared/services/api/packet-api.service';
import { PacketService } from 'src/shared/services/packet.service';

@Component({
	selector: 'app-packets',
	templateUrl: './packets.component.html',
	styleUrl: './packets.component.css'
})
export class PacketsComponent {
	expandedIndex = 0;
	
	constructor(
		protected packetService: PacketService
	) {
		console.log(packetService.get());
	}
}
