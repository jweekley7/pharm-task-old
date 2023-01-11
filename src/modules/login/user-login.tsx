import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { ChangeEvent, useState } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { GoogleSignInButton } from '../../components/ui/google-sign-in-button';

type UserLoginProps = {
  cancelClicked?: () => void;
}

export const UserLogin = (props: UserLoginProps) => {
  const {cancelClicked} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();
  const [password, setPassword] = useState<string | undefined>();
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const cancelLogin = () => {
    cancelClicked && cancelClicked()
  }

  const handleEmailPasswordLogin = () => {
    //Login with userEmail & password
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
        <div className="w-full max-w-md space-y-4">
          <div>
            {//TODO: update with logo
              /* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            {//TODO: add subtitle?
              /* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          <form className="mt-4" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {/* <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div> */}
              <TextField
                required
                id="filled-required"
                label="Email address"
                type={'email'}
                autoComplete='email'
                variant="filled"
                fullWidth={true}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setUserEmail(event.target.value);
                }}
              />
              {/* <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div> */}
              <TextField
                required
                id="userPassword"
                label="Password"
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
            <div className="flex items-center justify-between py-4">
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
                onClick={() => handleEmailPasswordLogin()}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                Sign in
              </Button>
            </div>
          </form>

          <div className="flex items-center py-1">
            <hr className="border w-full"/>
            <span className="w-full text-center min-w-fit px-2"> Or continue with </span>
            <hr className="border w-full"/>
          </div>

          <GoogleSignInButton/>

        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          onClick={() => cancelLogin()}
        >
          Cancel
        </Button>
      </div>
    </div>   
  )
}

export default UserLogin;
