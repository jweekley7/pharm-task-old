export interface iChecklist {
  [key: string]: iChecklistData;  //key is auto assigned ID from firebase
}

export interface iChecklistData {
  checklistName: string; //This is for multiple "rooms" in each facility
  checklistId: string;
  checklistItems: iChecklistItem[];
}

export interface iChecklistItem {
  itemName: string;
  timeStamp: Date; //QUESTION: or string?
}
