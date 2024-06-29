import { Category } from "./Category";
import { Professional } from "./User";

export interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    active: boolean;
    image: string;
    rating: number;
    categoryId: string | null;
    professionalId: string;
    createdAt: string;
    updatedAt: string;
    Professional: Professional;
    Category: Category | null;
}
