import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPacketConfirmDialogComponent } from './buy-packet-confirm-dialog.component';

describe('BuyPacketConfirmDialogComponent', () => {
  let component: BuyPacketConfirmDialogComponent;
  let fixture: ComponentFixture<BuyPacketConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPacketConfirmDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyPacketConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
