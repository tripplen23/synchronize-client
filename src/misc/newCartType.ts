import { UUID } from "crypto";
import { UserReadType } from "./userType";

export interface CartReadType {
  id: UUID;
  userId: UUID;
  user: UserReadType;
  cartItems: CartItemReadType[];
}

export interface CategoryCreateType {
  cartItems: CartItemCreateType[];
}

export interface CategoryUpdateType {
  cartId: UUID;
  cartItems: CartItemUpdateType[];
}

export interface CartItemReadType {
  cartId: UUID;
  productId: UUID;
  productTitle: string;
  productPrice: number;
  quantity: number;
}

export interface CartItemCreateType {
  productId: UUID;
  quantity: number;
}

export interface CartItemUpdateType {
  productId: UUID;
  quantity: number;
}
