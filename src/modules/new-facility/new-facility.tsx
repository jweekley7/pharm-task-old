import { TextField, Button, ButtonGroup } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { iUser } from "../../models/user";
import { FacilityContext } from "../../providers/facility-provider";
import { Signup } from './signup';
import { NewPassword } from '../../components/ui/new-password';
import { UserLogin } from '../login/user-login';
import { iNewFacility } from "../../models/facility";

type NewFacilityProps = {
  userLoggedIn: boolean,
  user: iUser | null,
  onCreateFacilitySuccess: () => void;
}

export const NewFacility = (props: NewFacilityProps) => {
  const {
    userLoggedIn,
    user,
    onCreateFacilitySuccess,
  } = props;
  const { 
    createNewFacility, 
    checkForDuplicateFacility 
  } = useContext(FacilityContext);  
  const [showLogInMethods, setShowLogInMethods] = useState<boolean>();
  const [showSignUpMethods, setShowSignUpMethods] = useState<boolean>();
  const [needAccountPrompt, setNeedAccountPrompt] = useState<boolean>(true);
  const [facilityPasswordConfirmed, setFacilityPasswordConfirmed] = useState<boolean>(); //TODO: disable button if false
  const [facilityPassword, setFacilityPassword] = useState<string>();
  const [facilityName, setFacilityName] = useState<string>();
  const [facilityAdminEmail, setFacilityAdminEmail] = useState<string>();
  const [facilityLogOnId, setFacilityLogOnId] = useState<string>();
  
  const handleCreateFacilityClick = async () => {
    if (facilityName && facilityLogOnId && facilityPassword && facilityAdminEmail) {
      console.log('click successful');
      const duplicateFacility = await checkForDuplicateFacility(facilityName, facilityLogOnId);

      if (!duplicateFacility) {

        const newFacility: iNewFacility = {
          facilityName: facilityName,
          logOnID: facilityLogOnId,
          logOnPassWord: facilityPassword,
        }

        try {
          await createNewFacility(newFacility, [facilityAdminEmail]);
          onCreateFacilitySuccess();

          //TODO: navigate to dashboard
        } catch (error) {
          console.log('Error creating facility: ', error)
        }
      }
    }    
  }
    
  return (
    <div>
      {!userLoggedIn ? (
        needAccountPrompt ? (
          <div className="flex flex-col items-center text-center">
            To create a facility you must have an account. Login or sign up for a new one.
            <ButtonGroup 
              variant="contained" 
              aria-label="outlined primary button group"
              className="mt-4"
            >
              <Button
                onClick={() => {
                  setNeedAccountPrompt(false);
                  setShowLogInMethods(true);
                  setShowSignUpMethods(false);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setNeedAccountPrompt(false);
                  setShowSignUpMethods(true);
                  setShowLogInMethods(false);
                }}
              >
                Sign Up
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <div>
            {showLogInMethods && !showSignUpMethods && 
            <UserLogin
              cancelClicked={() => setNeedAccountPrompt(true)}
            />
            }
            {!showLogInMethods && showSignUpMethods && (
            <Signup 
              cancelClicked={() => setNeedAccountPrompt(true)}
            />
            )}
          </div>
        )
      ) : (
        <div>
          <div className="py-1">
            <TextField
              required
              id="facilityName"
              label="Facility Name"
              fullWidth={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFacilityName(event.target.value);
              }}
            />
          </div>
          <div className="py-1">
            <TextField
              required
              id="facilityEmail"
              label="Email"
              helperText="Please enter your email. You will be an admin user for this facility"
              fullWidth={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFacilityAdminEmail(event.target.value);
              }}
              // TODO: get default value working
              defaultValue={user?.userEmail}
            />
          </div>
          <div className="py-1">
            <TextField
              required
              id="facilityName"
              label="Facility Log On ID"
              fullWidth={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFacilityLogOnId(event.target.value);
              }}
              helperText='To be used by all members of your facility'
            />
          </div>
          {/*TODO: hide button until password is confirmed?*/}
          <NewPassword
            isPasswordConfirmed={setFacilityPasswordConfirmed}
            getPassword={setFacilityPassword}
            passwordLabel='Facility Password'
            passwordHelpText='To be used by all members of your facility'
          />
          {/*TODO: form or no form?*/}
          <div className="flex justify-end mt-2">
            <Button 
              variant="contained" 
              onClick={() => {
                //TODO: navigate to dashboard
                handleCreateFacilityClick();
              }}
            >
              Create Facility
            </Button>
          </div>
        </div>
      )}
    </div>  
  )
};

export default NewFacility;
