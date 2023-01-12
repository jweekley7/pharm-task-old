import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { ChangeEvent, useContext, useState } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { FacilityContext } from '../../providers/facility-provider';
import { iFacility, iNewFacility } from '../../models/facility';

type FacilityLoginProps = {
  // checkFacilityLoginStatus: (isFacilityLoggedIn: boolean) => void;
  // loggedInFacility: (loggedInFacility: iFacility | iNewFacility) => void;
  onLoginSuccess: () => void;
}

export const FacilityLogin = (props: FacilityLoginProps) => {
  // const {checkFacilityLoginStatus, loggedInFacility} = props;
  const {onLoginSuccess} = props;

  const {currentFacility, facilityLogIn} = useContext(FacilityContext);

  const [showPassword, setShowPassword] = useState(false);
  const [facilityLogOnId, setFacilityLogOnId] = useState<string>();
  const [password, setPassword] = useState<string>();
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFacilityLogin = async () => {
    //Login with facilityLogOnId & password

    if (facilityLogOnId && password) {
      
      await facilityLogIn(facilityLogOnId, password);
      onLoginSuccess();
    }   
  }
  
  return (
    <div>     
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {//TODO: update with logo
              /* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your facility
            </h2>
            {//TODO: add subtitle?
              /* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          <div>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <TextField
                required
                id="filled-required"
                label="Facility Login ID"
                variant="filled"
                fullWidth={true}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFacilityLogOnId(event.target.value);
                }}
              />
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            {/* TODO: set this up */}
            <div className="flex items-center justify-between py-2">
              
              {/* TODO: remove this? */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              {/* TODO: handle differently than user login */}
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant='contained'
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {handleFacilityLogin()}}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                Sign in
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>   
  )
}

export default FacilityLogin;
