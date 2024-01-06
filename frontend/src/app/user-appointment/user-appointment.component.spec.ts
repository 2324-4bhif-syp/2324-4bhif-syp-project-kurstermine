import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppointmentComponent } from './user-appointment.component';

describe('Appointment1Component', () => {
    let component: UserAppointmentComponent;
    let fixture: ComponentFixture<UserAppointmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserAppointmentComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserAppointmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
