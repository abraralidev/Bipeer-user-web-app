import { Category } from "./Category";
import { Shop } from "./Shop";

export interface ProductByFilter {
    id: string;
    name: string;
    price: number;
    discountedPrice: number;
    itemQuantity: number;
    attributes: any[];
    galleryImages: any[];
    mainImage: string;
    description: string;
    publish: boolean;
    status: string;
    rating: number;
    categoryId: string;
    shopId: string;
    createdAt: string;
    updatedAt: string;
    unitId: string;
    ProductAttribute: any[];
    ProductVariation: any[];
    ProductRating: any[];
    Unit: any;
    Shop: Shop;
    Category: Category;
}