import { UserReadType } from "./userType";

export interface CartReadType {
  id: string;
  userId: string;
  user: UserReadType;
  cartItems: CartItemReadType[];
}

export interface CategoryCreateType {
  cartItems: CartItemCreateType[];
}

export interface CategoryUpdateType {
  cartId: string;
  cartItems: CartItemUpdateType[];
}

export interface CartItemReadType {
  cartId: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
}

export interface CartItemCreateType {
  productId: string;
  quantity: number;
}

export interface CartItemUpdateType {
  productId: string;
  quantity: number;
}