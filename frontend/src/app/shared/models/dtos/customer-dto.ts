import { Customer } from '../customer';

export interface CustomerDto {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    createdTimestamp: number;
}

export const fromCustomer = (customer: Customer): CustomerDto => {
    return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        createdTimestamp: customer.dateOfBirth.getTime(),
    };
};
