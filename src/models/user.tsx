import { userRoles } from "../utils/constants";
import { iFacility } from "./facility";

export interface iUser {
  role: userRoles; //QUESTION: What if a user is admin for one place but not another?
  userEmail: string;
  userId: string;
  fullName: string;
  facilities: iFacility[];
  userSigningCredentials: iUserSigningCredentials;
}

export interface iUserSigningCredentials {
  userID: string;
  userPin: number;
}
