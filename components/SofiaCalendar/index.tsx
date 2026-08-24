import React from "react";
import Calendar from "react-calendar";
import { CalendarValue } from "./types";
import "react-calendar/dist/Calendar.css";

import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";

const CalendarStyle = styled.div`
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-libre-franklin), "Arial", "Helvetica", sans-serif;
  }
  .react-calendar__navigation__label__labelText {
    color: #09090b;
    font-size: 16px;
    font-weight: 600;
  }
  .react-calendar__tile--active {
    background: #1175c0;
    color: white;
    border-radius: 100%;
  }
  .react-calendar__tile {
    font-size: 14px;
    font-weight: 500;
    padding: 14px 8px;
    font-family: var(--font-libre-franklin), "Arial", "Helvetica", sans-serif;
    border-radius: 100%;
  }
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background: white;
    border: none;
    font-family: var(--font-libre-franklin), "Arial", "Helvetica", sans-serif;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1175c0;
  }
  .react-calendar__tile--now {
    background: #1175c0;
    color: #fff;
    border-radius: 100%;
    border: 1px solid #1175c0;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #fff;
    border: 1px solid #1175c0;
    color: #1175c0;
  }
`;

interface SofiaCalendarProp {
  setValue: React.Dispatch<React.SetStateAction<CalendarValue>>;
  value: CalendarValue;
}

const SofiaCalendar: React.FC<SofiaCalendarProp> = ({ value, setValue }) => {
  return (
    <CalendarStyle>
      <Calendar
        onChange={setValue}
        value={value}
        prevLabel={<IoIosArrowBack />}
        nextLabel={<IoIosArrowForward />}
        next2Label={<RxDoubleArrowRight />}
        prev2Label={<RxDoubleArrowLeft />}
      />
    </CalendarStyle>
  );
};

export default SofiaCalendar;
