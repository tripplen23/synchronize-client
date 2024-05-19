import { UUID } from "crypto";
import { CategoryReadType } from "./categoryType";
import { ImageReadType, ImageUpdateType } from "./ImageType";

export interface ProductReadType {
  id: UUID;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productInventory: number;
  productImage: ImageReadType[];
  categoryId: UUID;
  category: CategoryReadType;
}

export interface ProductCreateType {
  productTitle: string;
  productDescription: string;
  productPrice: number;
  categoryId: UUID;
  productInventory: number;
  productImage: ImageReadType[];
}

export interface ProductUpdateType {
  id: UUID;
  productTitle?: string;
  productDescription?: string;
  productPrice?: number;
  categoryId?: UUID;
  productInventory?: number;
  productImage?: ImageUpdateType[];
}
