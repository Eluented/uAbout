import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';
import { userSearchResult } from '../../reducers/mainSlice.js'
import { Box } from "@mui/system";
import {
  FormControl,
  Button,
  Typography,
  TextField,
  Container
} from "@mui/material";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const searchResult = useSelector(userSearchResult);
  const results = searchResult.data.results;


  return (
    <>
      <Container maxWidth="md" style={{ backgroundColor: "white" }}>
        <Box sx={{ pt: "2%", pb: "5%", mb: "5%" }}>
          <h1>Search Results for {username}</h1>
        </Box>

        {searchResult.status === 204
          &&
          <Box sx={{ pt: "2%", pb: "5%", mt: "2%", mb: "5%" }}>
            <h2>Could not find any results for {username}</h2>
          </Box>
        }


        {searchResult.status === 200
          && 
          results.map(({username, first_name, last_name }, idx) => (
            <Box key={idx} sx={{ pt: "2%", pb: "5%", mt: "2%", mb: "5%" }}>
            <h3>{username}</h3>
            <h3>{first_name}</h3>
            <h3>{last_name}</h3>
            </Box>
          ))}

      </Container>
    </>
  )
}

export default SearchResultsPage;