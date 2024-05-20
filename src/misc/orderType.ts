import { UserReadType } from "./userType";
import { orderStatus } from "./enum";

export interface OrderReadType {
  id: string;
  User: UserReadType;
  OrderProducts: OrderProductReadType[];
  ShippingInfo: ShippingInfoReadType;
  totalPrice: number;
  orderStatus: orderStatus;
}

export interface OrderCreateType {
  orderProducts: OrderProductCreateType[];
  shippingInfo: ShippingInfoCreateType;
  orderStatus: orderStatus;
}

export interface OrderUpdateStatusType {
  orderId: string;
  shippingInfo?: ShippingInfoUpdateType;
  orderStatus: orderStatus;
}

export interface OrderProductReadType {
  productId: string;
  productTitle: string;
  productPrice: number;
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
