import { CustomerDto } from './dtos/customer-dto';

export interface Customer {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
}

export const fromCustomerDto = (customer: CustomerDto): Customer => {
    return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        dateOfBirth: new Date(customer.createdTimestamp),
    };
};
