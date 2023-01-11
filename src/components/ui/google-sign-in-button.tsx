import { useContext } from 'react';
import { AuthContext } from '../../providers/auth-provider';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';

export const GoogleSignInButton = () => {
  const { signInWithGoogle, isLoggedIn } = useContext(AuthContext);
  
  const handleGoogleLoginClick = async () => {
    try {
      await signInWithGoogle();

      try {
        if (isLoggedIn) {
          console.log('Login successful!')
        }
        
      } catch (error) {
        console.log('Trouble confirming Google login: ', error)
      }

    } catch (error) {
      console.log('Trouble logging in with google: ', error);
    }
  }
  
  return (
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
          Sign in with Google
        </span>
      </Button>
    </div>
  )
}

export default GoogleSignInButton;
