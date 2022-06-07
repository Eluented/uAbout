import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackgroundLetterAvatars from "../AvatarIcon";


const ExpandMore = styled((props) => {

  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function EventCard( { post_body, post_title, post_id, event_start, event_end } ) {


  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 700, display: "block" }}>
      <CardHeader
        avatar={<BackgroundLetterAvatars sx={{ width: 50, height: 50 }} />}
        title={post_title}
      />
      {/* <CardMedia 
      component="img"
      height="194"
      image=""
      alt=""
      /> */}
      <CardContent>
        <Typography>Start Date: {event_start}</Typography>
        <Typography>End Date: {event_end}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Going">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Comments">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Location: </Typography>
          <Typography paragraph>{post_body}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default EventCard;
