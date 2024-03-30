import {OrganisationDto} from "./dtos/organisation-dto";

export interface Organisation {
    id?: number,
    name: string,
    uniqueName: number
}

export const fromOrganisationDto = (organisationDto: OrganisationDto): Organisation => {
    return {
        id: organisationDto.id,
        name: organisationDto.name,
        uniqueName: organisationDto.uniqueName,
    }
}
