import { UUID } from "crypto";
import { UserReadType } from "./userType";
import { orderStatus } from "./enum";

export interface OrderReadType {
  id: UUID;
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
  orderId: UUID;
  shippingInfo?: ShippingInfoUpdateType;
  orderStatus: orderStatus;
}

export interface OrderProductReadType {
  productId: UUID;
  productTitle: string;
  productPrice: number;
  quantity: number;
}

export interface OrderProductCreateType {
  productId: UUID;
  quantity: number;
}

export interface OrderProductUpdateType {
  productId: UUID;
  quantity: number;
}

export interface ShippingInfoReadType {
  id: UUID;
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
  shippingInfoId: UUID;
  shippingAddress?: string;
  shippingCity?: string;
  shippingCountry?: string;
  shippingPostCode?: string;
  shippingPhone?: string;
}
