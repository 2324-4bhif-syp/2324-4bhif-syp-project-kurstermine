import {
  Appointment,
  AppointmentManagement,
  Customer,
  Instructor,
  Offer,
  Organisation,
  Packet,
  Participation,
  Purchase,
} from "@models";
import { Draft, produce } from "immer";
import { KeycloakProfile } from "keycloak-js";
import { BehaviorSubject } from "rxjs";
import { Course } from "./course";
import { User } from "./user";
import { Token } from "./token";
import { Category } from "./category";

export interface Model {
  readonly appointments: Appointment[];
  readonly packets: Packet[];
  readonly organisations: Organisation[];
  readonly offers: Offer[];
  readonly purchases: Purchase[];
  readonly appointmentManagements: AppointmentManagement[];
  readonly instructors: Instructor[];
  readonly customer: Customer | undefined;
  readonly customers: Customer[];
  readonly participations: Participation[];
  readonly users: User[];
  readonly courses: Course[];
  readonly tokens: Token[];
  readonly currentUser: User;
  readonly categories: Category[];
}

export const store = new BehaviorSubject<Model>({
  appointments: [],
  packets: [],
  organisations: [],
  offers: [],
  purchases: [],
  instructors: [],
  appointmentManagements: [],
  customer: undefined,
  customers: [],
  participations: [],
  categories: [],
  currentUser: {
    id: "thomas",
    firstName: "thomas",
    lastName: "thomas",
    email: "thomas.thomas@thomas.thomas",
  },
  courses: [
    {
      id: 1,
      categoryId: 1,
      name: "Sport",
    },
  ],
  tokens: [
    {
      id: "",
      categoryId: 1,
      purchasedAt: new Date(),
      redeemedAt: new Date(),
      userId: "thomas",
      appointmentId: 1,
    },
  ],
  users: [
    {
      id: "thomas",
      firstName: "thomas",
      lastName: "thomas",
      email: "thomas.thomas@thomas.thomas",
    },
  ],
});

export function set(recipe: (model: Draft<Model>) => void) {
  const next = produce(store.value, recipe);
  store.next(next);
}

export function userProfileToCustomer(userprofile: KeycloakProfile): Customer {
  return {
    id: userprofile.id,
    firstName: userprofile.firstName!,
    lastName: userprofile.lastName!,
    email: userprofile.email!,
  };
}
