import { ChangeEvent, useState, useEffect } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type NewPasswordProps = {
  isPasswordConfirmed: (passwordConfirmed: boolean) => void;
}

export const NewPassword = (props: NewPasswordProps) => {
  const {isPasswordConfirmed} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<
    string | undefined
  >();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (password === confirmPassword) {
      isPasswordConfirmed(true);
    }
  })

  return (
    <div>
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
    </div>   
  )
}

export default NewPassword;
