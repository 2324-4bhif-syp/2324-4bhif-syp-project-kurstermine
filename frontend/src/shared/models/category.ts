import { CategoryDto } from '@models/dtos/category-dto';

export interface Category {
    id: number;
    name: string;
    organisationId: number;
}

export const fromCategoryDto = (category: CategoryDto): Category => {
    return {
        id: category.id,
        name: category.name,
        organisationId: category.organisation.id,
    };
};
