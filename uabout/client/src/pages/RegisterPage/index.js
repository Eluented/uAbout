import React, { useState } from 'react';
import httpClient from '../../httpClient';
import { Box } from "@mui/system";
import {
    FormControl,
    Button,
    Typography,
    TextField,
    Container
} from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({});

  function handleSubmit(e) {
    return e.preventDefault();
  }
  const setData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const registerUser = async () => {
    console.log(formData)

    try {
        const resp = await httpClient.post("https://uabout.herokuapp.com/api/register", formData)
        
        console.log(resp.data)
    } catch(e){
        console.log(e)
    }

}

  return (
    <Container maxWidth="md" style={{ backgroundColor: "white" }}>
    <Typography>Register</Typography>
    
    <form onSubmit={handleSubmit}>
        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
            <FormControl fullWidth>
                <TextField
                type="text"
                label="First Name"
                name='first_name'
                onChange={(e) => setData(e)}
                />
            </FormControl>
        </Box>

        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
            <FormControl fullWidth>
                <TextField
                type="text"
                label="Last Name"
                name='last_name'
                onChange={(e) => setData(e)}
                />
            </FormControl>
        </Box>

        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
            <FormControl fullWidth>
                <TextField
                type="text"
                label="Username"
                name='username'
                onChange={(e) => setData(e)}
                />
            </FormControl>
        </Box>

        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
            <FormControl fullWidth>
                <TextField
                type="text"
                label="Email"
                name='email'
                onChange={(e) => setData(e)}
                />
            </FormControl>
        </Box>

        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
            <FormControl fullWidth>
                <TextField
                type="text"
                label="Password"
                name='password'
                onChange={(e) => setData(e)}
                />
            </FormControl>
        </Box>

        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
            <FormControl fullWidth>
                <TextField
                type="number"
                label="Phone Number"
                name='phone_number'
                onChange={(e) => setData(e)}
                />
            </FormControl>
        </Box>
                    
        <Button 
            fullWidth
            variant="contained"
            type="submit"
            onClick={registerUser}
        >Register
        </Button>
    </form>


</Container >
  )
}

export default RegisterPage;