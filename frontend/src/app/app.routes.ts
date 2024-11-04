import { AuthGuard } from './other/guard/auth.guard';
import { RoleGuard } from './other/guard/role.guard';
import { UserAppointmentsComponent } from './user/user-appointments/user-appointments.component';
import { AdminAppointmentsComponent } from './admin/admin-appointments/admin-appointments.component';
import { UserComponent } from './other/userinfo/user.component';
import { Roles } from '@models';
import { AdminAppointmentComponent } from './admin/admin-appointment/admin-appointment.component';
import { HomeComponent } from './other/home/home.component';
import { UserOrganisationsComponent } from './user/user-organisations/user-organisations.component';
import { Routes } from '@angular/router';
import {
    UserCourseExplorerComponent,
    routes as userExplorerRouters,
} from '@components/user/user-course-explorer/user-course-explorer.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'appointments',
        component: UserAppointmentsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Roles.Customer] },
    },
    {
        path: 'organisations',
        component: UserOrganisationsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Roles.Customer] },
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'courses',
        children: userExplorerRouters,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Roles.Customer] },
    },
    {
        path: 'admin',
        children: [
            {
                path: 'appointments',
                component: AdminAppointmentsComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin] },
            },
            {
                path: 'appointments/:id',
                component: AdminAppointmentComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Roles.Admin] },
            },
        ],
    },
];
