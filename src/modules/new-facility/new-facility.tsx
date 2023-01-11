import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Button, ButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { iUser } from "../../models/user";
import { AuthContext } from "../../providers/auth-provider";
import { FacilityContext } from "../../providers/facility-provider";
import { Signup } from './signup';

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
  const [showSignUpMethods, setShowSignUpMethods] = useState<boolean | undefined>();
  
  const handleLoginClick = () => {
    //check auth
  }

  const handleSignUpClick = () => {
    setShowSignUpMethods(true);
  }
  
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

  const handleSubmit = () => {

  }

  const handleBackClicked = () => {
    if (showAccountSignin && !showSignUpMethods) {
      
    }
  }

  //If user logs in, show create facility screen
  useEffect(() => {
    setShowAccountSignin(!userLoggedIn);
  },[userLoggedIn])
    
  return (
    <div>
      {showAccountSignin ? (
        !showSignUpMethods ? (
          <div className="flex flex-col items-center text-center">
            To create a facility you must have an account. Login or sign up for a new one.
            <ButtonGroup 
              variant="contained" 
              aria-label="outlined primary button group"
              className="mt-4"
            >
              <Button
                onClick={() => {handleLoginClick()}}
              >
                Login
              </Button>
              <Button
                onClick={() => {handleSignUpClick()}}
              >
                Sign Up
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <Signup 
            cancelClicked={() => setShowSignUpMethods(false)}
          />
        )
      ) : (
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
          <form onSubmit={handleSubmit}>
            <div className="py-1">
              <TextField
                required
                id="filled-required"
                label="Facility Name"
                variant="filled"
                fullWidth={true}
              />
            </div>
            {/* <div className="py-1">
              <TextField
                required
                id="filled-required"
                label="Facility Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                fullWidth={true}
              />
              
            </div> */}
            <div className="flex justify-end mt-2">
              <Button variant="contained" type='submit'>Create Facility</Button>
            </div>
          
          </form>
        </div>
      )}
    </div>  
  )
};

export default NewFacility;
