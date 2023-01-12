import React, { ReactNode, useState } from "react";
import { iFacility, iNewFacility } from "../models/facility";
import { FacilityService } from "../services/facility-service";

type FacilityProviderProps = {
  children: ReactNode;
};

type FacilityContextProps = {
  currentFacility?: iFacility | null | undefined;
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
  facilityLogIn: (
    logOnId: string, 
    facilityPassword: string
  ) => Promise<void>;
  facilityLogOut: () => void;
}

export const FacilityContext = React.createContext({} as FacilityContextProps);

const FacilityProvider = ({ children }: FacilityProviderProps) => {
  const _facilityService = new FacilityService();
  const [currentFacility, setCurrentFacility] = useState<iFacility | null>();
  
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
      const facility = await _facilityService.addNewFacility(newFacility, facilityAdminEmails);
      setCurrentFacility(facility);
    
    } catch (error) {
      
      //TODO: display error message to user 
      console.log('Trouble creating facility: ', error)
    }
  }

  const facilityLogOut = () => {
    setCurrentFacility(null);
  };

  const facilityLogIn = async (logOnId: string, facilityPassword: string) => {
    //get facility by logOnId
    const facility = await _facilityService.getFacilityByLogOnId(logOnId);

    //verify password matches
    if (facility?.logOnPassWord === facilityPassword) {

      setCurrentFacility(facility);
      console.log('login successful')
    }
  }

  // const completeOrUpdateFacilityProfile = async (newFacility?: iNewFacility, existingFacility?: iFacility, userEmails?: string[], adminEmails?: string[]) => {
    
  //   let updatedFacilityProfile: iFacility;
    
  //   if (newFacility) {

  //     updatedFacilityProfile = {
  //       facilityId: newFacility
  //     }

  //   }

  //   if (existingFacility) {

  //   }
    
  // }

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
        facilityLogIn,
        facilityLogOut,
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export default FacilityProvider