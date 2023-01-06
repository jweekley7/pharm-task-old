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
import { iFacility } from '../models/facility';


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

}