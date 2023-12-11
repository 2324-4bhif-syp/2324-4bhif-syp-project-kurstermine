import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ParticipationComponent } from './participations/participation.component';
import {InstructorsComponent} from "./instructors/instructors.component";
import { AppointmentManagementComponent } from './appointment-management/appointment-management.component';
import {initializeKeycloak} from "./init/keycloak-init.factory";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AppointmentsComponent,
    AppointmentComponent,
    ParticipationComponent,
    InstructorsComponent,
    AppointmentManagementComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      KeycloakAngularModule,
      BrowserAnimationsModule,
      MatButtonModule,
      AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
