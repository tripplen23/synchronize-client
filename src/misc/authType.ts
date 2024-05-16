import { UUID } from "crypto";

export interface UserDetailsType {
  id: UUID;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  userRole: string; // User Role is enum between Customer and Admin

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
  UserName: string;
  UserEmail: string;
  UserPassword: string;
  UserRole: "customer";
  UserAvatar?: string;
}
