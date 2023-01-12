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

    const facilityDb: iFacility = {
      facilityId: facilityRef.id,
      facilityName: newFacility.facilityName,
      logOnID: newFacility.logOnID,
      logOnPassWord: newFacility.logOnPassWord,
      facilityAdminEmails: facilityAdminEmails,     
    }
  
    try {
      await setDoc(facilityRef, facilityDb);

      return facilityDb;

    } catch (error) {
      console.log('Could not add facility to DB: ', error);
    }  
  }

  //Need to complete facility type on DB for correct typing
  public getFacilityByLogOnId = async (logOnId: string) => {
    const querySnapshot = await getDocs(this._DBFacilitiesCollection);
    
    let matchedFacility: iFacility | undefined;

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const facility = doc.data() as iFacility;

      if (facility.logOnID === logOnId) {
        matchedFacility = facility;
      }
      
    });

    return matchedFacility;
  }

}