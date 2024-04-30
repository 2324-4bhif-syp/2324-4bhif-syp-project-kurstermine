import { Draft, produce } from "immer";
import { BehaviorSubject } from "rxjs";
import { Appointment } from "src/shared/models/appointment";
import { AppointmentManagement } from "src/shared/models/appointmentManagement";
import { Customer } from "src/shared/models/customer";
import { Offer } from "src/shared/models/offer";
import { Organisation } from "src/shared/models/organisation";
import { Packet } from "src/shared/models/packet";
import { Participation } from "src/shared/models/participation";
import { Purchase } from "src/shared/models/purchase";

export interface Model {
    readonly appointments: Appointment[];
    readonly packets: Packet[];
    readonly organisations: Organisation[];
    readonly offers: Offer[];
    readonly purchases: Purchase[];
    readonly appointmentManagements: AppointmentManagement[];
    readonly customer: Customer | undefined;
    readonly participations: Participation[];   
}

export const store = new BehaviorSubject<Model>({
    appointments: [],
    packets: [],
    organisations: [],
    offers: [],
    purchases: [],
    appointmentManagements: [],
    customer: undefined,
    participations: []
});

export function set(recipe: (model: Draft<Model>) => void) {
    const next = produce(store.value, recipe);
    store.next(next);
}
