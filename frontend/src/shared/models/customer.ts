import { CustomerDto } from '@models/dtos';

export interface Customer {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const fromCustomerDto = (customer: CustomerDto): Customer => {
    return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
    }
}
