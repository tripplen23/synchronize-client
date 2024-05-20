import { CategoryReadType } from "./categoryType";
import { ImageReadType, ImageUpdateType } from "./ImageType";

export interface ProductReadType {
  id: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productInventory: number;
  productImage: ImageReadType[];
  categoryId: string;
  category: CategoryReadType;
}

export interface ProductCreateType {
  productTitle: string;
  productDescription: string;
  productPrice: number;
  categoryId: string;
  productInventory: number;
  productImage: ImageReadType[];
}

export interface ProductUpdateType {
  id: string;
  productTitle?: string;
  productDescription?: string;
  productPrice?: number;
  categoryId?: string;
  productInventory?: number;
  productImage?: ImageUpdateType[];
}
