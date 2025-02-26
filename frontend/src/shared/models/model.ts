import {
    Appointment,
    AppointmentManagement,
    Organisation,
    Course,
    User,
    Token,
    Category,
} from "@models";
import { Draft, produce } from "immer";
import { KeycloakProfile } from "keycloak-js";
import { BehaviorSubject } from "rxjs";
import {AdminUser} from "@models/admin-user";

export interface Model {
    readonly appointments: Appointment[];
    readonly organisations: Organisation[];
    readonly appointmentManagements: AppointmentManagement[];
    readonly instructors: User[];
    readonly customers: User[];
    readonly users: User[];
    readonly adminUsers: AdminUser[];
    readonly courses: Course[];
    readonly tokensForCurrentUser: Token[];
    readonly tokensForCurrentOrganisation: Token[];
    readonly currentUser?: User;
    readonly categories: Category[];
    readonly courseView: {
        readonly selectedCategoryId?: number;
        readonly selectedOrganisationId?: number;
        readonly selectedCourseId?: number;
    };
    readonly appointmentView: {
        readonly selectedAppointmentId?: number;
        readonly appointmentManagements: AppointmentManagement[];
    };
}

export const store = new BehaviorSubject<Model>({
    appointments: [],
    organisations: [],
    instructors: [],
    appointmentManagements: [],
    customers: [],
    categories: [],
    currentUser: undefined,
    courses: [],
    tokensForCurrentUser: [],
    tokensForCurrentOrganisation: [],
    users: [],
    adminUsers: [],
    courseView: {},
    appointmentView: {
        appointmentManagements: [],
    },
});

export function set(recipe: (model: Draft<Model>) => void) {
    const next = produce(store.value, recipe);
    store.next(next);
}

export function userProfileToUser(userprofile: KeycloakProfile): User {
    return {
        id: userprofile.id,
        firstName: userprofile.firstName!,
        lastName: userprofile.lastName!,
        email: userprofile.email!,
    };
}
