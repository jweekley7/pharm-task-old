import { useContext } from "react";
import { FacilityContext } from "../../providers/facility-provider";

export const NewFacility = () => {
  const { doesFacilityExist, doesAdminUserExistOnAnyFacility } = useContext(FacilityContext);  
  
  const preventDuplicateFacilityCreation = async (facilityName: string, userEmail: string) => {
    const facilityNameMatch = await doesFacilityExist(facilityName);
    const userEmailMatch = await doesAdminUserExistOnAnyFacility(userEmail);

    //if facility name matches, throw error?
    if (facilityNameMatch) {
      console.log('facility match')
    }

    //if user email is admin on any facility, list out facilities and ask if they meant one of those.
    //if respose is no, create facility. otherwise have them login to existing facility
    if (userEmailMatch.userMatch) {
      console.log(userEmailMatch.userFacilities)
    }


    //TODO: if facility doesn't exist in DB, create it
    //TODO: if user email is linked to another facility, double check to create it first
  }
    
  return (
    <div>
      <form>
        <label htmlFor="facilityName">Facility Name</label>
        <input inputMode="text" id="facilityName" required></input>

        <label htmlFor="facilityEmail">Admin Email</label>
        <input inputMode="text" id="facilityEmail" required></input>
        
        <button type="button" 
          onClick={() => {
            const facilityInput = document.getElementById('facilityName') as HTMLInputElement;
            const emailInput = document.getElementById('facilityEmail') as HTMLInputElement;
            preventDuplicateFacilityCreation(facilityInput.value, emailInput.value)
          }}
        >
          Create Facility
        </button>
      </form>
    </div>  
  )
};

export default NewFacility;