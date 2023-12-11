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
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guard/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserAppointmentsComponent} from "./user-appointments/user-appointments.component";
import { UserComponent } from './user/user.component';
import { RoleGuard } from './guard/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full'},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard, RoleGuard],  data: { roles: ['admin'] } },
  { path: 'instructors', component: InstructorsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'appointments-user', component: UserAppointmentsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user'] } },
  { path: 'appointments-admin', component: AppointmentsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
];

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
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
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
