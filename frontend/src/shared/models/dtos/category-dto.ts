import { Category } from '@models';

export interface CategoryDto {
    id: number;
    name: string;
    organisation: {
        id: number;
    };
}

export const fromCategory = (category: Category): CategoryDto => {
    return {
        id: category.id,
        name: category.name,
        organisation: {
            id: category.organisationId,
        },
    };
};
