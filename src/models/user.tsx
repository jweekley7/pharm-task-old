import { userRoles } from "../utils/constants";

export interface iUser {
  role: userRoles,
  userEmail: string,
  id: string,
  fullName: string,
}