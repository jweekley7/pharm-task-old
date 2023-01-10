import { iChecklist } from './checklist.tsx';
import { iUser } from './user.tsx';

export interface iFacility {
  facilityId: string;
  facilityName: string;
  logOnID: string;
  logOnPassWord: string;
  facilityAdmin: iUser[]; //QUESTION: or string of emails/ids?
  checklist: iChecklist[];
  users: iUser[];
}
