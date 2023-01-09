import { userRoles } from "../utils/constants";

export interface iUser {
  role: userRoles,
  userEmail: string,
  userId: string,
  fullName: string,
}