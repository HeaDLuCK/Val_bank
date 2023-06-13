import events from "./events";
import React, { useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Appp() {
    const handleEvent = (e) =>{
        console.log("clicked at value");
    }

    const calendarRef = useRef(null);

  const handleButtonClick = (date) => {
    const calendarApi = calendarRef.current.getApi();
    const newEvent = {
      title: 'New Event',
      start: date,
      allDay: true,
    };
    calendarApi.addEvent(newEvent);
  };

  const renderCustomColumns = (props) => {
    const { date } = props;
    return (
      <div className="fc-daygrid-day-number">
        <div>{date.getDate()}</div>
        <button onClick={() => handleButtonClick(date)}>Add Event</button>
      </div>
    );
  };
  return (
    <div className="App">
      <FullCalendar 
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin]}
        editable={true}
        selectable={true}
        events={events}
        dayRender={renderCustomColumns}
      />
    </div>
  );
}
