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

const SearchFriendsPage = () => {
    const [formData, setFormData] = useState({});

    function handleSubmit(e) {
      return e.preventDefault();
    }

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // posts to API to search for user in Database
    const searchFriends = async () => {
      console.log(formData)

      try {
          const resp = await httpClient.post("https://uabout.herokuapp.com/api/friends", formData)
          
          console.log(resp.data)
      } catch(e){
          console.log(e)
      }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
        <FormControl fullWidth>
            <TextField
            type="text"
            label="Search"
            name='search'
            onChange={(e) => setData(e)}
            />
        </FormControl>
      </Box>

        <Button 
        fullWidth
        variant="contained"
        type="submit"
        onClick={searchFriends}
        >Search Users
        </Button>
    </form>
    </>
  )
}

export default SearchFriendsPage;