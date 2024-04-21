import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './other/guard/auth.guard';
import { RoleGuard } from './other/guard/role.guard';
import { AdminInstructorsComponent } from './admin/admin-instructors/admin-instructors.component';
import { UserAppointmentsComponent } from './user/user-appointments/user-appointments.component';
import { AdminAppointmentsComponent } from './admin/admin-appointments/admin-appointments.component';
import { UserComponent } from './other/userinfo/user.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { Roles } from '../shared/models/roles';
import { UserPacketsComponent } from './user/user-packets/user-packets.component';
import { UserPacketInfoComponent } from './user/user-packet-info/user-packet-info.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import {AdminPacketsComponent} from "./admin/admin-packets/admin-packets.component";
import {AdminInstructorComponent} from "./admin/admin-instructor/admin-instructor.component";
import { AdminAppointmentComponent } from './admin/admin-appointment/admin-appointment.component';
import {HomeComponent} from "./other/home/home.component";
import {UserOrganisationsComponent} from "./user/user-organisations/user-organisations.component";
import {UserPacketsOfOrgComponent} from "./user/user-packets-of-org/user-packets-of-org.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'appointments',
        component: UserAppointmentsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { 
            roles: [Roles.Customer],
            breadcrumb: 'Appointments'
        },
    },
    {
        path: 'organisations',
        component: UserOrganisationsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Roles.Customer], breadcrumb: 'Organisations'},
    },
    {
        path: 'organisations/:id/packets',
        component: UserPacketsOfOrgComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [Roles.Customer], breadcrumb: 'Packets'}
    },
    {
        path: 'organisations/:organisationId/packets/:packetId',
        component: UserPacketInfoComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [Roles.Customer], breadcrumb: 'Packet Info'}
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Home' }
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'User' }
    },
    {
        path: 'packets',
        component: UserPacketsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [Roles.Customer], breadcrumb: 'Packets'}
    },
    {
        path: 'packets/:id',
        component: UserPacketInfoComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [Roles.Customer], breadcrumb: 'Packet Info'}
    },
    {
        path: 'admin',
        children: [
            {
                path: 'packets',
                component: AdminPacketsComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: {roles: [Roles.Admin], breadcrumb: 'Packets'}
            },
            {
                path: 'customers',
                component: AdminCustomersComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin], breadcrumb: 'Customers'},
            },
            {
                path: 'customers/:id',
                component: AdminCustomerComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin], breadcrumb: 'Customer'},
            },
            {
                path: 'instructors',
                component: AdminInstructorsComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin], breadcrumb: 'Instructors'},
            },
            {
                path: 'instructors/:id',
                component: AdminInstructorComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin], breadcrumb: 'Instructor'},
            },
            {
                path: 'appointments',
                component: AdminAppointmentsComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin], breadcrumb: 'Appointments'},
            },
            {
                path: 'appointments/:id',
                component: AdminAppointmentComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin], breadcrumb: 'Appointment'},
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
