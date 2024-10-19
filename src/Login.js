import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid2, Typography} from '@mui/material';


export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", loginData);
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Grid2 container columnSpacing={0} xs={12} height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Grid2 item>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          <div>
            <TextField
              fullWidth
              name="email"
              required
              id="outlined-email"
              label="Email"
              value={loginData.email} // Usar value para reflejar el estado
              type="email"
              onChange={handleLoginData}
            />
          </div>
          <div>
            <TextField
              fullWidth
              name="password"
              required
              id="outlined-password"
              label="Password"
              value={loginData.password} // Usar value para reflejar el estado
              type="password"
              onChange={handleLoginData}
            />
          </div>
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
}