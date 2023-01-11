import { TextField, Button, ButtonGroup } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { iUser } from "../../models/user";
import { AuthContext } from "../../providers/auth-provider";
import { FacilityContext } from "../../providers/facility-provider";
import { Signup } from './signup';
import { NewPassword } from '../../components/ui/new-password';
import { Login } from '../login/login';

type NewFacilityProps = {
  userLoggedIn: boolean,
  user: iUser | null,
}

export const NewFacility = (props: NewFacilityProps) => {
  const {
    userLoggedIn, 
    user, 
  } = props;
  const { doesFacilityExist, doesAdminUserExistOnAnyFacility } = useContext(FacilityContext);  
  const { signupWithEmailAndPasssword } = useContext(AuthContext);
  const [showAccountSignin, setShowAccountSignin] = useState(!userLoggedIn);
  const [showLogInMethods, setShowLogInMethods] = useState<boolean>();
  const [showSignUpMethods, setShowSignUpMethods] = useState<boolean>();
  const [facilityPasswordConfirmed, setFacilityPasswordConfirmed] = useState<boolean>();
  const [facilityPassword, setFacilityPassword] = useState<string>();
  const [facilityName, setFacilityName] = useState<string>();
  const [facilityEmail, setFacilityEmail] = useState<string>();
  
  const handleLoginClick = () => {
    //check auth
  }
  
  const preventDuplicateFacilityCreation = async (facilityName: string, userEmail: string) => {
    const facilityNameMatch = await doesFacilityExist(facilityName);
    const userEmailMatch = await doesAdminUserExistOnAnyFacility(userEmail);

    //TODO: if facility name matches, throw error?
    if (facilityNameMatch) {
      console.log('facility match')
    }

    //TODO: if user email is admin on any facility, list out facilities and ask if they meant one of those.
    //if respose is no, create facility. otherwise have them login to existing facility
    if (userEmailMatch.userMatch) {
      console.log(userEmailMatch.userFacilities)
    }


    //TODO: if facility doesn't exist in DB, create it
    //TODO: if user email is linked to another facility, double check to create it first
  }

  const handleBackClicked = () => {
    if (showAccountSignin && !showSignUpMethods) {
      
    }
  }

  useEffect(() => {
    setShowAccountSignin(!userLoggedIn);
  },[userLoggedIn])
    
  return (
    <div>
      {showAccountSignin ? (
        !userLoggedIn ? (
          <div className="flex flex-col items-center text-center">
            To create a facility you must have an account. Login or sign up for a new one.
            <ButtonGroup 
              variant="contained" 
              aria-label="outlined primary button group"
              className="mt-4"
            >
              <Button
                onClick={() => {
                  setShowLogInMethods(true);
                  setShowSignUpMethods(false);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
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
            <Login/>
            }
            {!showLogInMethods && showSignUpMethods && (
            <Signup 
              cancelClicked={() => setShowSignUpMethods(false)}
            />
            }
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
              helperText="You will be an admin user for this facility"
              fullWidth={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFacilityEmail(event.target.value);
              }}
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
                //TODO: prevent duplicate facility creation
                //TODO: add facility to DB
                //TODO: navigate to add users page
              }}
            >
              Create Facility
            </Button>
          </div>
          {/*<button type="button" 
            onClick={() => {
              const facilityInput = document.getElementById('facilityName') as HTMLInputElement;
              const emailInput = document.getElementById('facilityEmail') as HTMLInputElement;
              preventDuplicateFacilityCreation(facilityInput.value, emailInput.value);
            }}
          >
            Create Facility
          </button>*/}
        </div>
      )}
    </div>  
  )
};

export default NewFacility;
