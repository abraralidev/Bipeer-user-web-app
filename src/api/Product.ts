import { Category } from "./Category";
import { Shop } from "./Shop";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  createdAt: string;
  updatedAt: string;
  mainImage: string;
  description: string;
  publish: boolean;
  itemQuantity: number;
  rating: number;
  Shop?: Shop;
  status: string;
  Category: Category;
  galleryImages: String[];
}
