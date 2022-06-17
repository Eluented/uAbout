import React from "react";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import { postsResult } from "../../reducers/mainSlice";
import { useSelector } from "react-redux";

const ReactCalendar = () => {
  const posts = useSelector(postsResult);

  const filteredEvents = posts.map( ({ event_end, event_start, post_title }, idx) => ( {event_end, event_start, post_title, idx} ) )
  
  console.log(filteredEvents);

  return (
    <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    events={[
      {title: 'Pub With the Boys', start: '2022-06-15', end: '2022-06-18'}
    ]}
  />
  );
};

export default ReactCalendar;
