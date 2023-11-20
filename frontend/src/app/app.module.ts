import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ParticipationsComponent } from './participations/participations.component';
import {InstructorsComponent} from "./instructors/instructors.component";

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AppointmentsComponent,
    AppointmentComponent,
    ParticipationsComponent,
    InstructorsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
