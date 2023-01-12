import { DBApp } from './firebase-core'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  limit,
  orderBy,
  onSnapshot,
  DocumentSnapshot,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import {DBCollections} from "../utils/constants";
import { iFacility, iNewFacility } from '../models/facility';
import { iUser } from '../models/user';


export class FacilityService {
  private _DBFacilitiesCollection = collection(DBApp, DBCollections.facilities);

  public getFacilityByIdDB = async (facilityId: string) => {
    const facilitiesRef = doc(this._DBFacilitiesCollection, facilityId);
    const facilitySnap = await getDoc(facilitiesRef);
    return facilitySnap.data() as iFacility;
  }

  public getAllFacilitiesFromDB = async () => {
    const allFacilitiesQuerySnapshot = await getDocs(this._DBFacilitiesCollection); 
    const allFacilities: iFacility[] = [];
    allFacilitiesQuerySnapshot.forEach((doc) => {
      const facility = doc.data() as iFacility;
      allFacilities.push(facility);
    });
    return allFacilities;
  }

  public addNewFacility = async (
    newFacility: iNewFacility, 
    facilityAdminEmails: string[], 
  ) => {
    const facilityRef = doc(this._DBFacilitiesCollection);
    await setDoc(facilityRef, {
      facilityName: newFacility.facilityName,
      logOnID: newFacility.logOnID,
      logOnPassWord: newFacility.logOnPassWord,
      facilityAdminEmails: facilityAdminEmails,
    })
  }

}