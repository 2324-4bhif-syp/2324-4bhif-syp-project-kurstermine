import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPacketComponent } from './admin-packet.component';

describe('AdminPacketComponent', () => {
  let component: AdminPacketComponent;
  let fixture: ComponentFixture<AdminPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
