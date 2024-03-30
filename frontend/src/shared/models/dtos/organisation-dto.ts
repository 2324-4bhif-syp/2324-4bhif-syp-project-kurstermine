import {Organisation} from "../organisation";

export interface OrganisationDto {
    id?: number,
    name: string,
    uniqueName: number
}

export const fromOrganisation = (organisation: Organisation): OrganisationDto => {
    return {
        id: organisation.id,
        name: organisation.name,
        uniqueName: organisation.uniqueName,
    }
}
