import { UUID } from "crypto";

export enum UserRole {
  Admin = "admin",
  Customer = "customer",
}

export interface UserDetailsType {
  id: UUID;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userRole: UserRole;

  /*
  address?: {
    city: string;
    number: string;
    zipcode: string;
    geolocation?: {
      lat?: string;
      long?: string;
    };
  };
  phone?: string;
  */
}

export interface LoginType {
  email: string;
  password: string;
}
export interface RegisterType {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: UserRole;
  userAvatar?: string;
}
