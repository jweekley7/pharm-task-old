import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  //TODO: handle login here
  const handleSubmit = (data: any) => {
    console.log(data)
  }
  
  const loginForm = (
    <form onSubmit={handleSubmit}>
      <div className="py-1">
        <TextField
          required
          id="filled-required"
          label="Facility ID"
          variant="filled"
          fullWidth={true}
        />
      </div>
      <div className="py-1">
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
        
      </div>
      <div className="flex justify-end pt-2">
        <Button variant="contained" type='submit'>LogIn</Button>
      </div>
      
    </form>
  )
  
  return (
    <div>
      {loginForm}
    </div>   
  )
}

export default Login;