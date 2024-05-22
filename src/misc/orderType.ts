import { UserReadType } from "./userType";
import { orderStatus } from "./enum";
import { ProductReadType } from "./newProductType";

export interface OrderReadType {
  id: string;
  User: UserReadType;
  orderProducts: OrderProductReadType[];
  shippingInfo: ShippingInfoReadType;
  totalPrice: number;
  orderStatus: orderStatus;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface OrderCreateType {
  orderProducts: OrderProductCreateType[];
  shippingInfo: ShippingInfoCreateType;
  orderStatus?: orderStatus;
}

export interface OrderUpdateStatusType {
  orderId: string;
  shippingInfo?: ShippingInfoUpdateType;
  orderStatus: orderStatus;
}

export interface OrderProductReadType {
  product: ProductReadType;
  quantity: number;
}

export interface OrderProductCreateType {
  productId: string;
  quantity: number;
}

export interface OrderProductUpdateType {
  productId: string;
  quantity: number;
}

export interface ShippingInfoReadType {
  id: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostCode: string;
  shippingPhone: string;
}

export interface ShippingInfoCreateType {
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostCode: string;
  shippingPhone: string;
}

export interface ShippingInfoUpdateType {
  shippingInfoId: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingCountry?: string;
  shippingPostCode?: string;
  shippingPhone?: string;
}
