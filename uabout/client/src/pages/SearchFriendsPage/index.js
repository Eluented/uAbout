import React, { useState } from 'react';
import { Box } from "@mui/system";
import {
  FormControl,
  Button,
  Typography,
  TextField,
  Container
} from "@mui/material";

import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from '../../reducers/mainSlice'

const SearchFriendsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchFriendsStatus = useSelector(state => state.main.status);
    const searchFriendsError = useSelector(state => state.main.searchError);

    const [formData, setFormData] = useState({});

    // posts to API to search for user in Database
    function handleSubmit(e) {
      e.preventDefault();
      dispatch(fetchUsers(formData))
      // if search succeeds... changes url to searched user (fool the user)
      if (searchFriendsStatus === "succeeded"){
        return navigate(`/search/${formData.username}`)     
      }
    };

    // when user types sets form data based on name
    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
    };
    
  return (
    <>
    { searchFriendsStatus === "failed" 
            &&    <h1>{searchFriendsError}</h1>}
    <form onSubmit={handleSubmit}>
        <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
        <FormControl fullWidth>
            <TextField
            type="text"
            label="Search"
            name='username'
            onChange={(e) => setData(e)}
            />
        </FormControl>
      </Box>

        <Button 
        fullWidth
        variant="contained"
        type="submit"
        >Search Users
        </Button>
    </form>
    </>
  )
}

export default SearchFriendsPage;