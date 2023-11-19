import { Customer } from "../customer"

export interface CustomerDto {
    id?: number,
    email: string,
    first_name: string,
    last_name: string,
    date_of_birth: string
}

export const fromCustomer = (customer: Customer):CustomerDto => {
    return {
        id: customer.id,
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email, 
        date_of_birth: customer.dateOfBirth.toISOString(),
    }
}