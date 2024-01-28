import { Component, Input } from '@angular/core';
import { Packet } from 'src/shared/models/packet';

@Component({
  selector: 'app-packet',
  templateUrl: './packet.component.html',
  styleUrl: './packet.component.css'
})
export class PacketComponent {
  @Input({required: true}) 
  public packet!: Packet;

  constructor() {

  }
}
