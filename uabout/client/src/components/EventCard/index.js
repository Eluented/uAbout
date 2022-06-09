import React, { useState, useEffect } from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";

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

function EventCard({ post_body, post_title, post_id, event_start, event_end }) {
  const [expanded, setExpanded] = useState(false);

  const [selected, setSelected] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 700, display: "block" }}>
      <CardHeader
        avatar={<BackgroundLetterAvatars sx={{ width: 50, height: 50 }} />}
        titleTypographyProps={{variant:'h3' }}
        title={post_title}
      />
      {/* <CardMedia 
      component="img"
      height="194"
      image=""
      alt=""
      /> */}
      <CardContent>
        <Typography>Start Date: {event_start.split(" ").slice(0, 4).join(" ")}</Typography>
        <Typography>End Date: {event_end.split(" ").slice(0, 4).join(" ")}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="interaction-btns">
          <ToggleButton
            value="true"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <CheckIcon />
          </ToggleButton>
          <IconButton aria-label="Comments">
            <FavoriteIcon />
          </IconButton>
        </div>
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
          <Typography paragraph>{post_body}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default EventCard;
