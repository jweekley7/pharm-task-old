import { iChecklist } from './checklist';

export interface iFacility {
  facilityId: string;
  facilityName: string;
  logOnID: string;
  logOnPassWord: string;
  facilityAdminEmails: string[];
  checklist: iChecklist[];
  userEmails: string[];
}

export interface iNewFacility {
  facilityName: string;
  logOnID: string;
  logOnPassWord: string;
}
