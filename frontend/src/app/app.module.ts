import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ParticipantsComponent } from './participants/participants.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AppointmentsComponent,
    AppointmentComponent,
    ParticipantsComponent,
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
