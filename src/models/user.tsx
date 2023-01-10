import { userRoles } from "../utils/constants";

export interface iUser {
  role: userRoles; //What if a user is admin for one place but not another?
  userEmail: string;
  userId: string;
  fullName: string;
  facilities: iFacility[];
}
