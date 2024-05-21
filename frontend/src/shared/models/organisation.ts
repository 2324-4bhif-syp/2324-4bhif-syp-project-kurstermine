import { OrganisationDto } from '@models/dtos';

export interface Organisation {
    id?: number;
    name: string;
    uniqueName: string;
}

export const fromOrganisationDto = (
    organisationDto: OrganisationDto,
): Organisation => {
    return {
        id: organisationDto.id,
        name: organisationDto.name,
        uniqueName: organisationDto.uniqueName,
    };
};
