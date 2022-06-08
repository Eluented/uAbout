import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { userSearchResult } from "../../reducers/mainSlice.js";
import { Box } from "@mui/system";
import "./index.css";
import {
  FormControl,
  Button,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import BackgroundLetterAvatars from "../../components/AvatarIcon";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const searchResult = useSelector(userSearchResult);
  const results = searchResult;

  function sendFriendRequest() {}

  return (
    <>
      <Container class="Container" maxWidth="md">
        <Box sx={{ pt: "2%", pb: "5%", mb: "5%" }}>
          <h1>Search Results for {username}</h1>
        </Box>

        {/* {searchResult.status === 204 && (
          <Box sx={{ pt: "2%", pb: "5%", mt: "2%", mb: "5%" }}>
            <h2>Could not find any results for {username}</h2>
          </Box>
        )} */}

        {
          results.map(({ username, first_name, last_name }, idx) => (
            <Box
              class="FriendBox"
              key={idx}
              sx={{ pt: "2%", pb: "5%", mt: "2%", mb: "5%" }}
            >
              <div class="Avatar">
                <BackgroundLetterAvatars />
              </div>
              <div class="NameBox">
                {first_name} {last_name}
              </div>
              <div class="UsernameBox">{username}</div>
              <Button variant="outlined" onClick={sendFriendRequest()}>
                Add Friend
              </Button>
            </Box>
          ))}
      </Container>
    </>
  );
};

export default SearchResultsPage;
