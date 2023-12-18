import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {RoleGuard} from "./guard/role.guard";
import {InstructorsComponent} from "./instructors/instructors.component";
import {UserAppointmentsComponent} from "./user-appointments/user-appointments.component";
import {AppointmentsComponent} from "./appointments/appointments.component";
import {UserComponent} from "./user/user.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {CustomersComponent} from "./customers/customers.component";

const routes: Routes = [
    {path: '', redirectTo: 'appointments-user', pathMatch: 'full'},
    {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['admin']}},
    {
        path: 'instructors',
        component: InstructorsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ['admin']}
    },
    {
        path: 'appointments-user',
        component: UserAppointmentsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ['user']}
    },
    {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ['admin']}
    },
    {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminViewComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['admin']}},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
