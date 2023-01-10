import { iChecklist } from './checklist.tsx';
import { iUser } from './user.tsx';

export interface iFacility {
  facilityId: string;
  facilityName: string;
  logOnID: string;
  logOnPassWord: string;
  facilityAdmin: string[]; //QUESTION: string of emails or ids?
  checklist: iChecklist[];
  users: iUser[];
}
