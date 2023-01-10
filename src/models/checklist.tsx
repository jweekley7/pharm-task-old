import { iUser } from './user.tsx';

export interface iChecklist {
  [key: string]: iChecklistData;  //key is auto assigned ID from firebase
}

export interface iChecklistData {
  checklistName: string; //This is for multiple "rooms" in each facility
  checklistId: string; //QUESTION: have here and as key or only as key?
  checklistItems: iChecklistItem[];
}

//Stored checklist items on the DB
export interface iChecklistItem {
  itemName: string;
  timeStamp: Date; //QUESTION: or string?
  completedBy: iUser; //QUESTION: or just string of name?
  backDated: boolean;
  backDatedDate?: Date; //QUESTION: or string?
  userComments?: string;
}
