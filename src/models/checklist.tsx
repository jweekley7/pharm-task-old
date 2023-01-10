export interface iChecklist {
  [key: string]: iChecklistData;
}

export interface iChecklistData {
  checklistName: string;
  checklistItem: string;
}
