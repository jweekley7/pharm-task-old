import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/auth-provider';
import { UserService } from '../../services/user-service';
import { iUser } from '../../models/user';
import { Link, useLocation, useNavigate, Location } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

import {
  EmailAuthProvider,
  linkWithCredential,
  updateProfile,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Button, ButtonGroup, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { userRoles } from '../../utils/constants';

type SignupProps = {
  adminUser?: boolean,
  cancelClicked?: () => void;
}

export const Signup = (props: SignupProps) => {
  const {adminUser, cancelClicked} = props;
  const userService = new UserService();
  const {
    isLoggedIn,
    currentUser,
    signupWithEmailAndPasssword,
    signInWithGoogle,
    updateLoginStatus,
    userLogOut,
  } = useContext(AuthContext);
  //const navigate = useNavigate();
  //const { state }: Location = useLocation();
  //const { mEmail }: any = state;
  const [userEmail, setUserEmail] = useState<string>(); //mEmail as default state
  const [profilePic, setProfilePic] = useState<File | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string>();
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [confrmPassword, setConfirmPassword] = useState<
    string | undefined
  >();
  const [signupLoading, setSignupLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<userRoles>(userRoles.basicUser);
  const [userId, setUserId] = useState<string>();
  const [loginWithEmailAndPassword, setLoginWithEmailAndPassword] = useState<boolean>();
  const [loginWithGoogle, setLoginWithGoogle] = useState<boolean>();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const addUser = async () => {
    if (userEmail && password) {
      let credential;
      let imageLink = '';
      if (!currentUser) {
        credential = await signupWithEmailAndPasssword(userEmail, password);
      } else {
        try {
          const emailCredential = EmailAuthProvider.credential(userEmail, password);
          credential = await linkWithCredential(currentUser, emailCredential);
          if (currentUser.photoURL) {
            imageLink = currentUser.photoURL;
          }
        } catch (error) {
          const fError = error as FirebaseError;
          if (fError.code === 'auth/requires-recent-login') {
            await signInWithGoogle();
            addUser();
          }
        }
      }

      if (adminUser) {
        setRole(userRoles.admin)
      }

      if (credential) {
        // if (profilePic) {
        //   imageLink = await userService.uploadProfilePic(
        //     credential.user,
        //     profilePic
        //   );
        // }

        setUserId(currentUser?.uid)

        if (fullName) {
          await userService.addOrUpdateUserProfile({
            role,
            userEmail,
            userId,
            fullName
          } as iUser);
        }
        
        const userUpdated = await updateProfile(credential.user, {
          displayName: fullName,
          photoURL: imageLink,
        });

        if (userUpdated !== null) await updateLoginStatus(credential.user);
      }
    }
  };

  const handleGoogleLoginClick = async () => {
    try {
      await signInWithGoogle();

      if (isLoggedIn) {
        console.log('now = ' + isLoggedIn)
      }

      try {
        console.log('user logged in')
        
      } catch (error) {
        console.log('Trouble confirming login: ', error)
      }

    } catch (error) {
      console.log('Trouble logging in with google: ', error);
    }
  }

  // const navigateToCorrectPage = async () => {
  //   if (isLoggedIn) {
  //     const redirectUrl = localStorage.getItem('rTo');
  //     if (redirectUrl) {
  //       navigate(redirectUrl);
  //       return;
  //     }
  //     navigate('/home');
  //   }
  //   if (mEmail) setUserEmail(mEmail);
  // };

  // useEffect(() => {
  //   navigateToCorrectPage();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoggedIn, currentUser, mEmail]);

  const cancelSignUp = () => {
    cancelClicked && cancelClicked()
  }

  const cancelEmailPasswordSignup = () => {
    setLoginWithEmailAndPassword(false);
    setLoginWithGoogle(false);
  }

  useEffect(() => {
    console.log('isLoggedIn = ' + isLoggedIn)
  })

  return (
    <div>
      {!loginWithEmailAndPassword && !loginWithGoogle ? (
          <div>
            <h2>Signup using one of the following:</h2>
            <div className='flex justify-center'>
              <ButtonGroup 
                variant="contained" 
                aria-label="outlined primary button group"
                className="mt-4"
                orientation='vertical'
              >
                <Button
                  onClick={() => {
                    setLoginWithEmailAndPassword(true);
                    setLoginWithGoogle(false);
                  }}
                >
                  Email and Password
                </Button>
                <Button
                  onClick={() => {
                    setLoginWithEmailAndPassword(false);
                    setLoginWithGoogle(true);
                  }}
                >
                  Google
                </Button>
              </ButtonGroup>
            </div>
            <div className='flex justify-end'>
              <Button
                onClick={() => cancelSignUp()}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {loginWithEmailAndPassword && !loginWithGoogle && (
                <form
                  className="flex flex-col justify-between flex-1"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSignupLoading(true);
                    addUser();
                  }}
                >
                  <TextField
                    placeholder="Fullname"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setFullName(event.target.value);
                    }}
                  />
                  <TextField
                    placeholder="Email address"
                    value={userEmail}
                    type="email"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setUserEmail(event.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="filled-required"
                    label="Facility Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setPassword(event.target.value);
                    }}
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
                  <TextField
                    required
                    id="filled-required"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setConfirmPassword(event.target.value);
                    }}
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
                  {/* <Checkbox
                    label={
                      <span>
                        I agree to{' '}
                        <Link to="/terms-and-condition" target="_blank">
                          Terms & conditions
                        </Link>
                      </span>
                    }
                    customClass="flex"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setTermsAgreed(e.target.checked);
                    }}
                  /> */}
                  <div className='flex justify-between'>
                    <div className="flex justify-start pt-2">
                      <Button 
                        variant="contained" 
                        type='submit'
                        disabled={
                          !userEmail ||
                          !password ||
                          password !== confrmPassword //||
                          // !termsAgreed
                        }
                        onClick={() => {
                          setSignupLoading(true);
                          addUser();
                        }}
                      >
                        LogIn
                      </Button>
                    </div>
                    <div className='flex justify-end'>
                      <Button
                        onClick={() => cancelEmailPasswordSignup()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  
                </form>
              )}
            </div>
            <div>
              {!loginWithEmailAndPassword && loginWithGoogle && (
                <div className='flex flex-col'>
                  <div
                    className='flex justify-center'
                  >
                    <Button
                      variant="contained"
                      onClick={async () => {
                        await handleGoogleLoginClick();

                      }}
                    >
                      <GoogleIcon></GoogleIcon>
                      <span
                        className='pl-2'
                      >
                        Sign up with Google
                      </span>
                    </Button>
                  </div>
                  <div className='flex justify-end'>
                    <Button
                      onClick={() => cancelEmailPasswordSignup()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Signup;