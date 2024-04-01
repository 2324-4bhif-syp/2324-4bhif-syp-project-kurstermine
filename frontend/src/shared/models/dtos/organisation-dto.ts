import {Organisation} from "../organisation";

export interface OrganisationDto {
    id?: number,
    name: string,
    uniqueName: string
}

export const fromOrganisation = (organisation: Organisation): OrganisationDto => {
    return {
        id: organisation.id,
        name: organisation.name,
        uniqueName: organisation.uniqueName,
    }
}
