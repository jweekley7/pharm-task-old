import React, { ReactNode, useState } from "react";
import { iFacility, iNewFacility } from "../models/facility";
import { FacilityService } from "../services/facility-service";

type FacilityProviderProps = {
  children: ReactNode;
};

type FacilityContextProps = {
  currentFacility?: iFacility | iNewFacility;
  doesFacilityAlreadyExist: (newFacility: iNewFacility) => Promise<boolean>
  getFacilityFromId: (facilityId: string) => Promise<void>;
  createNewFacility: (
    newFacility: iNewFacility, 
    facilityAdminEmails: string[], 
  ) => Promise<void>;
  checkForDuplicateFacility: (
    facilityName: string, 
    facilityLogOnId: string, 
  ) => Promise<boolean>;
}

export const FacilityContext = React.createContext({} as FacilityContextProps);

const FacilityProvider = ({ children }: FacilityProviderProps) => {
  const _facilityService = new FacilityService();
  const [currentFacility, setCurrentFacility] = useState<iFacility | iNewFacility>();
  
  const getFacilityFromId = async (facilityId: string) => {
    const facility = await _facilityService.getFacilityByIdDB(facilityId);
    setCurrentFacility(facility);
  }

  const doesFacilityAlreadyExist = async (newFacility: iNewFacility) => {
    const allFacilities = await _facilityService.getAllFacilitiesFromDB();

    let facilityMatch = false;

    allFacilities.forEach((facility) => {
      if (facility.facilityName === newFacility.facilityName) {
        facilityMatch = true;
      }

      if (facility.logOnID === newFacility.logOnID) {
        facilityMatch = true;
      }
    })
  
    return facilityMatch
  };

  const createNewFacility = async (
    newFacility: iNewFacility, 
    facilityAdminEmails: string[], 
  ) => {
    
    try {
      await _facilityService.addNewFacility(newFacility, facilityAdminEmails);
      setCurrentFacility(newFacility);
    
    } catch (error) {
      
      //TODO: display error message to user 
      console.log('Trouble creating facility: ', error)
    }
  }

  const checkForDuplicateFacility = async (
    facilityName: string, 
    facilityLogOnId: string, 
  ) => {

    const newFacility: iNewFacility = {
      facilityName: facilityName,
      logOnID: facilityLogOnId,
      logOnPassWord: '',
    }

    const facilityMatch = await doesFacilityAlreadyExist(newFacility);

    return facilityMatch;
  }
  
  return (
    <FacilityContext.Provider
      value={{
        currentFacility,
        doesFacilityAlreadyExist,
        getFacilityFromId,
        createNewFacility,
        checkForDuplicateFacility,
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export default FacilityProvider