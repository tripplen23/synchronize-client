import { UserRole } from "./enum";

export interface UserReadType {
  id: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userRole: UserRole;
}

export interface UserCreateType {
  userName: string;
  userEmail: string;
  userPassword: string;
  userAvatar?: string;
  userRole: UserRole;
}

export interface UserUpdateType {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userAvatar?: string;
  userRole?: UserRole;
}
