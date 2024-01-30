import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketsComponent } from './packets.component';

describe('PacketComponent', () => {
  let component: PacketsComponent;
  let fixture: ComponentFixture<PacketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
