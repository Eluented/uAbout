import React, { useState, useEffect } from "react";
import { Navbar, SearchBar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './index.css'
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userSearchResult } from "../../reducers/mainSlice.js";
import { fetchUsers } from "../../reducers/mainSlice";

const SearchFriendsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const searchResult = useSelector(userSearchResult);

  // const [formData, setFormData] = useState({});

  // when user types sets form data based on name
  // const setData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  // };

  // status of the search function
  const searchFriendsStatus = useSelector((state) => state.main.status);

  // when form is submitted...
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("This is visible");
  //   dispatch(fetchUsers(formData));
  // }

  // useEffect(() => {
  //   // if the search function is completed
  //   if (searchResult) {
  //     navigate(`/search/${formData.username}`);
  //   }
  // }, [searchResult]);


  return (
    <>
      <Navbar />
      
        <SearchBar />
      

    </>
  );
};

export default SearchFriendsPage;
