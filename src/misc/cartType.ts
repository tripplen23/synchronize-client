import { ProductReadType } from "./productType";
import { UserReadType } from "./userType";

export interface CartReadType {
  id: string;
  userId: string;
  user: UserReadType;
  cartItems: CartItemReadType[];
}

export interface CartCreateType {
  cartItems: CartItemCreateType[];
}

export interface CartUpdateType {
  cartId: string;
  cartItems: CartItemUpdateType[];
}

export interface CartItemReadType {
  cartId: string;
  product: ProductReadType;
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
