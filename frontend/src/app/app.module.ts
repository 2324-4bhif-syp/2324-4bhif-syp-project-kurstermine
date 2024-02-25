import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { FormsModule } from '@angular/forms';
import { AdminAppointmentsComponent } from './admin/admin-appointments/admin-appointments.component';
import { AdminAppointmentComponent } from './admin/admin-appointment/admin-appointment.component';
import { AdminParticipationComponent } from './admin/admin-participations/admin-participation.component';
import { AdminInstructorsComponent } from './admin/admin-instructors/admin-instructors.component';
import { AdminAppointmentManagementComponent } from './admin/admin-appointment-management/admin-appointment-management.component';
import { initializeKeycloak } from './other/init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AppRoutingModule } from './app-routing.module';
import { UserPacketComponent } from './user/user-packet/user-packet.component';
import { UserPacketsComponent } from './user/user-packets/user-packets.component';
import { UserOfferComponent } from './user/user-offer/user-offer.component';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent,
        AdminCustomersComponent,
        AdminAppointmentsComponent,
        AdminAppointmentComponent,
        AdminParticipationComponent,
        AdminInstructorsComponent,
        AdminAppointmentManagementComponent,
        UserPacketComponent,
        UserPacketsComponent,
        UserOfferComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        KeycloakAngularModule,
        BrowserAnimationsModule,
        MatButtonModule,
        AppRoutingModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatCardModule,
        MatButtonModule,
        MatTreeModule,
        CdkAccordionModule,
        MatDividerModule,
        MatIconModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
