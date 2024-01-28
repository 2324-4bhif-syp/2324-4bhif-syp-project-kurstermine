import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ParticipationComponent } from './participations/participation.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { AppointmentManagementComponent } from './appointment-management/appointment-management.component';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AppRoutingModule } from './app-routing.module';
import { PacketComponent } from './packet/packet.component';
import { PacketsComponent } from './packets/packets.component';
import { OfferComponent } from './offer/offer.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
    declarations: [
        AppComponent,
        CustomersComponent,
        AppointmentsComponent,
        AppointmentComponent,
        ParticipationComponent,
        InstructorsComponent,
        AppointmentManagementComponent,
        PacketComponent,
        PacketsComponent,
        OfferComponent
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
