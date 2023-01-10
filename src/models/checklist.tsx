export interface iChecklist {
  [key: string]: iChecklistData;  //key is auto assigned ID from firebase
}

export interface iChecklistData {
  checklistName: string;
  checklistItem: string;
}
