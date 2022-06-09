import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@mui/material";
// import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { eventPost } from "../../reducers/mainSlice";
import Radio from "@mui/material/Radio";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { friends } from "../../reducers/mainSlice";

// import ReactDOM from "react-dom/client";

function EventForm({ setOpenModal }) {
  const theme = useTheme();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const allFriends = useSelector(friends)

  const [formData, setFormData] = useState({
    post_title: "",
    post_body: "",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [personName, setPersonName] = useState([]);
  const [eventsStatus, setEventsStatus] = useState(true);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(eventPost(event));
  };

  const event = {
    title: formData.post_title,
    body: formData.post_body,
    start_date: startDate.toString(),
    end_date: endDate.toString(),
    invitees: personName,
  };

  if (allFriends.length === 0){
    return (
      <>
      <div className="form-container">
        <div>
          <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
            x
          </button>
        </div>
        <form
          id="event-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            className="input-fields"
            id="outlined-event-name"
            label="Event Name"
            value={formData.post_title}
            onChange={(e) => handleChange(e)}
            name="post_title"
          />{" "}
          <br />
          <div className="date-container">
            <label>
              Start Date:
              <DatePicker
                className="date-input-field"
                onChange={(date) => setStartDate(date)}
                selected={startDate}
                name="start_date"
              />
            </label>
            <label>
              End Date:
              <DatePicker
                className="date-input-field"
                onChange={(date) => setEndDate(date)}
                selected={endDate}
                name="end_date"
              />
            </label>
          </div>
          <TextField
            className="input-fields"
            id="outlined-body-input"
            label="Event Details"
            value={formData.post_body}
            onChange={(e) => handleChange(e)}
            name="post_body"
          />
          <br />
          <Button variant="contained" id="post-btn" type="submit">
            Post
          </Button>
        </form>
      </div>
    </> 
    )
  } else {
    console.log(personName);

    function privateCheck(){
      return setEventsStatus(false)
    }
  
    function publicCheck() {
      return setEventsStatus(true)
    }
  
    const names = allFriends["friends"].map(props => props.first_name)

////////////////////////////////////////// SELECT FRIENDS CHIP STYLES /////////////////////////////////////////
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
  
    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
  
  
    const handleChanges = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
  
    console.log(event);


    return (
      <>
        <div className="form-container">
          <div>
            <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
              x
            </button>
          </div>
          <form
            id="event-form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div id="invite-options">
              <FormLabel id="invite-radio-btn-group"></FormLabel>
              <RadioGroup
                row
                aria-labelledby="invite-radio-btn-group-label"
                defaultValue={"public"}
                name="radio-buttons-group"
                onChange={(e) => handleChange(e)}
              >
                <FormControlLabel
                  value={"public"}
                  control={<Radio />}
                  label="Public"
                  onChange={publicCheck}
                />
                <FormControlLabel
                  value={"private"}
                  control={<Radio />}
                  label="Private"
                  onChange={privateCheck}
                />
              </RadioGroup>
              <InputLabel id="select-friends-label">Select Friends</InputLabel>
  
              {eventsStatus === false
                &&
                <Select
                  labelId="select-friends-label"
                  id="select-friends"
                  multiple
                  value={personName}
                  onChange={handleChanges}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexqrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              }
  
            </div>
            <TextField
              className="input-fields"
              id="outlined-event-name"
              label="Event Name"
              value={formData.post_title}
              onChange={(e) => handleChange(e)}
              name="post_title"
            />{" "}
            <br />
            <div className="date-container">
              <label>
                Start Date:
                <DatePicker
                  className="date-input-field"
                  onChange={(date) => setStartDate(date)}
                  selected={startDate}
                  name="start_date"
                />
              </label>
              <label>
                End Date:
                <DatePicker
                  className="date-input-field"
                  onChange={(date) => setEndDate(date)}
                  selected={endDate}
                  name="end_date"
                />
              </label>
            </div>
            <TextField
              className="input-fields"
              id="outlined-body-input"
              label="Event Details"
              value={formData.post_body}
              onChange={(e) => handleChange(e)}
              name="post_body"
            />
            <br />
            <Button variant="contained" id="post-btn" type="submit">
              Post
            </Button>
          </form>
        </div>
      </>
    );
  }

}

export default EventForm;
