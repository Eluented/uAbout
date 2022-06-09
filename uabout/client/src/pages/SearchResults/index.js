import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { userSearchResult } from "../../reducers/mainSlice.js";
import "./index.css";
import { FriendBox, Navbar, SearchBar } from "../../components";
import {
  FormControl,
  Button,
  Typography,
  TextField,
  Container,
} from "@mui/material";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const searchResult = useSelector(userSearchResult);
  const results = searchResult;

  console.log(results);
  
  return (
    <>
      <Container class="container" maxWidth="md">
      <Navbar />
      <SearchBar />

        <div class="SearchTop" sx={{ pt: "1%", pb: "1%", mb: "5%" }}>
          <h1>Search Results for ({username})</h1>
        </div>

        {/* {searchResult.status === 204 && (
          <Box sx={{ pt: "2%", pb: "5%", mt: "2%", mb: "5%" }}>
            <h2>Could not find any results for {username}</h2>
          </Box>
        )} */}

        {
          results.map(({ username, first_name, last_name, user_id }, idx) => (
            <FriendBox
              username={username}
              first_name={first_name}
              last_name={last_name}
              user_id={user_id}
              idx={idx} />
          ))}
      </Container>
    </>
  );
};

export default SearchResultsPage;
