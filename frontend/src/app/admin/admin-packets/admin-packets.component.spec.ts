import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPacketsComponent } from './admin-packets.component';

describe('AdminPacketsComponent', () => {
  let component: AdminPacketsComponent;
  let fixture: ComponentFixture<AdminPacketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPacketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
