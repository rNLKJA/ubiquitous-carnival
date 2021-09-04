// import required dependencies
import React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  // create onchange function
  const ChangeHandler = () => {
    setDate(date);
  };

  // return calendar component
  return (
    <React.Fragment>
      <h2>This is a Calendar</h2>
      <div className="calendar">
        <Calendar onChange={ChangeHandler} value={date}></Calendar>
      </div>
    </React.Fragment>
  );
};

export default ReactCalendar;
