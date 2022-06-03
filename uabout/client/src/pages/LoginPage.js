import React, { useState } from 'react'
import { Box } from "@mui/system";
import httpClient from '../httpClient'
import {
    FormControl,
    Button,
    Typography,
    TextField,
    Container
} from "@mui/material";


export const LoginPage = () => {
    const [formData, setFormData] = useState({});

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const logInUser = async () => {
        console.log(formData)

        const resp = await httpClient.post("https://uabout.herokuapp.com/api/login", formData)

        console.log(resp.data)
    }

  return (
    <Container maxWidth="md" style={{ backgroundColor: "white" }}>
        <Typography>Log in to your account!</Typography>

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

        <Button 
            fullWidth
            variant="contained"
            type="submit"
            onClick={logInUser}
        >Log In
        </Button>

    </Container >
  )
}
