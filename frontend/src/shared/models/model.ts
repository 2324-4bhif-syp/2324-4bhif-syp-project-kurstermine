import { Appointment, AppointmentManagement, Customer, Instructor, Offer, Organisation, Packet, Participation, Purchase } from "@models";
import { Draft, produce } from "immer";
import { BehaviorSubject } from "rxjs";

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
    participations: []
});

export function set(recipe: (model: Draft<Model>) => void) {
    const next = produce(store.value, recipe);
    store.next(next);
}
