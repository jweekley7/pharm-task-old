import React, { ReactNode, useEffect, useState } from "react";
import { iFacility } from "../models/facility";
import { iUser } from "../models/user";
import { FacilityService } from "../services/facility-service";

type FacilityProviderProps = {
  children: ReactNode;
};

type FacilityContextProps = {
  currentFacility?: iFacility;
  doesFacilityAlreadyExist: (facilityName?: string) => Promise<boolean>
  getFacilityFromId: (facilityId: string) => Promise<void>;
  doesAdminUserExistOnAnyFacility: (user: iUser) => Promise<{
    userMatch: boolean;
    userFacilities: string[];
  }>
}

export const FacilityContext = React.createContext({} as FacilityContextProps);

const FacilityProvider = ({ children }: FacilityProviderProps) => {
  const _facilityService = new FacilityService();
  const [currentFacility, setCurrentFacility] = useState<iFacility>();
  
  const getFacilityFromId = async (facilityId: string) => {
    const facility = await _facilityService.getFacilityByIdDB(facilityId);
    setCurrentFacility(facility);
  }

  const doesFacilityAlreadyExist = async (facilityName?: string) => {
    const allFacilities = await _facilityService.getAllFacilitiesFromDB();
    let facilityMatch = false;
    allFacilities.forEach((facility) => {
      if (facility.facilityName === facilityName) {
        facilityMatch = true;
      }
    })
    return facilityMatch
  };

  const doesAdminUserExistOnAnyFacility = async (user: iUser) => {
    const allFacilities = await _facilityService.getAllFacilitiesFromDB();
    let userMatch = false;
    const userFacilities: string[] = [];
    allFacilities.forEach((facility) => {
      if (facility.facilityAdmin.includes(user)) {
        userMatch = true;
        userFacilities.push(facility.facilityName)
      }
    })

    return {userMatch, userFacilities}
  }
  
  return (
    <FacilityContext.Provider
      value={{
        currentFacility,
        doesFacilityAlreadyExist,
        getFacilityFromId,
        doesAdminUserExistOnAnyFacility,
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export default FacilityProvider