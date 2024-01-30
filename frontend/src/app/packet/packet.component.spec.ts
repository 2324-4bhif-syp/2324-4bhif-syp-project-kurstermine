import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketComponent } from './packet.component';

describe('PacketComponent', () => {
  let component: PacketComponent;
  let fixture: ComponentFixture<PacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
