import React, { useState, useEffect } from 'react';
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
import { userSearchResult } from "../../reducers/mainSlice.js";
import { fetchUsers } from '../../reducers/mainSlice'

const SearchFriendsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchResult = useSelector(userSearchResult);

  const [formData, setFormData] = useState({});

  // when user types sets form data based on name
  const setData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
  };

  // status of the search function
  const searchFriendsStatus = useSelector(state => state.main.status);

  // when form is submitted...
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(fetchUsers(formData))
  };

  useEffect(() => {
    // if the search function is completed
    if (searchResult) {

      // if search succeeds... changes url to searched user (fool the user)
      // navigate(`/search/${formData.username}`)
    }
  }, [searchResult]);


  return (
    <>
      <Container maxWidth="md" style={{ backgroundColor: "white", paddingTop: "1%", paddingBottom: "2%" }}>
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
      </Container>
    </>
  )
}

export default SearchFriendsPage;