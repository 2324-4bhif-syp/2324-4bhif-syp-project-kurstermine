import { Customer } from '@models';

export interface CustomerDto {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
}

export const fromCustomer = (customer: Customer): CustomerDto => {
    return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
    };
};
