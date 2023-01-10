import { iChecklist } from './checklist';
import { iUser } from './user';

export interface iFacility {
  facilityId: string;
  facilityName: string;
  logOnID: string;
  logOnPassWord: string;
  facilityAdmin: iUser[]; //QUESTION: or string of emails/ids?
  checklist: iChecklist[];
  users: iUser[];
}
