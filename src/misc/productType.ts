import { CategoryReadType } from "./categoryType";

export interface ProductReadType {
  id: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productInventory: number;
  productImages: ImageReadType[];
  categoryId: string;
  category: CategoryReadType;
}

export interface ProductCreateType {
  productTitle: string;
  productDescription: string;
  productPrice: number;
  categoryId: string;
  productInventory: number;
  productImages: ImageCreateType[];
}

export interface ProductUpdateType {
  id: string;
  productTitle?: string;
  productDescription?: string;
  productPrice?: number;
  categoryId?: string;
  productInventory?: number;
}

export interface ImageReadType {
  id: string;
  imageData: string;
}

export interface ImageCreateType {
  imageData: string;
}