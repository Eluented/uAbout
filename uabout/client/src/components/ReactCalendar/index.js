import React from "react";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import { postsResult } from "../../reducers/mainSlice";
import { useSelector } from "react-redux";

const ReactCalendar = () => {
  const posts = useSelector(postsResult);

  const filteredEvents = posts.map( ({ event_end, event_start, post_title }) => ( { start:event_end, end:event_start, title:post_title } ) )

  console.log(filteredEvents);

  return (
    <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    events={filteredEvents}
  />
  );
};

export default ReactCalendar;
