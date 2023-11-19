import { CustomerDto } from "./dtos/customer-dto";

export interface Customer {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
}

export const fromCustomerDto = (customer: CustomerDto):Customer => {
    return {
        id: customer.id,
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email, 
        dateOfBirth: new Date(customer.date_of_birth)
    }
}