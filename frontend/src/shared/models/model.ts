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

export interface Model {
  readonly appointments: Appointment[];
  readonly organisations: Organisation[];
  readonly appointmentManagements: AppointmentManagement[];
  readonly instructors: User[];
  readonly customers: User[];
  readonly users: User[];
  readonly courses: Course[];
  readonly tokens: Token[];
  readonly currentUser?: User;
  readonly categories: Category[];
  readonly courseView: {
    readonly selectedCategory?: Category;
    readonly selectedOrganisation?: Organisation;
    readonly selectedCourse?: Course;
  };
}

export const store = new BehaviorSubject<Model>({
  appointments: [
    {
      id: 1,
      name: "App1",
      address: "Limesstraße",
      date: new Date("2024-05-06"),
      duration: 30,
      courseId: 1,
    },
  ],
  organisations: [],
  instructors: [],
  appointmentManagements: [],
  customers: [],
  categories: [
    {
      id: 1,
      name: "category1",
      organisationId: 1,
    },
    {
      id: 2,
      name: "category2",
      organisationId: 2,
    },
    {
      id: 3,
      name: "category3",
      organisationId: 2,
    },
  ],
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
      name: "Tennis",
    },
    {
      id: 2,
      categoryId: 2,
      name: "Fußball",
    },
    {
      id: 3,
      categoryId: 1,
      name: "Ski",
    },
    {
      id: 4,
      categoryId: 3,
      name: "Leetcode",
    },
    {
      id: 5,
      categoryId: 1,
      name: "Tennis",
    },
    {
      id: 6,
      categoryId: 1,
      name: "Tennis",
    },
    {
      id: 7,
      categoryId: 1,
      name: "Tennis",
    },
    {
      id: 8,
      categoryId: 1,
      name: "Tennis",
    },
    {
      id: 9,
      categoryId: 1,
      name: "Tennis",
    },
  ],
  tokens: [
    {
      id: "",
      categoryId: 1,
      purchasedAt: new Date(),
      redeemedAt: new Date(),
      userId: "thomas",
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
  courseView: {},
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
