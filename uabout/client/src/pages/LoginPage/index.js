import React, { useState } from 'react'
import { Box } from "@mui/system";
import httpClient from '../../httpClient'
import {
    FormControl,
    Button,
    Typography,
    TextField,
    Container
} from "@mui/material";

const LoginPage = () => {

    const [formData, setFormData] = useState({});
    const [user, setUser] = useState('')

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const logInUser = async () => {
        console.log(formData)

        try {
            const resp = await httpClient.post("https://uabout.herokuapp.com/api/login", formData)
            setUser(`${resp.data.username}`)
            
            console.log(resp.data)
        } catch(e){
            console.log(e)
        }

    }

  return (
    <Container maxWidth="md" style={{ backgroundColor: "white" }}>
        <Typography>Log in to your account!</Typography>

        {user.length > 0
            && <h1>Hello {user}</h1>
        }

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

export default LoginPage;