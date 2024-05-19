import { UUID } from "crypto";
import { UserRole } from "./enum";

export interface UserDetailsType {
  id: UUID;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userRole: UserRole;
}

export interface UserCredential {
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
