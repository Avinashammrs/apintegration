"use client";

import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
import { getMeetingDetails } from "@/store/reducers/meetingInfo";

function CalendarProject() {

  const dispatch = useDispatch()
  const hideSelectDateRangeStyles = `
    .MuiTypography-root.MuiTypography-overline {
      display: none;
    }
  `;

  const hideSelectedDateStyles = `
    .MuiStaticDateRangePicker-toolbarTitle {
      display: none;
    }
  `;

  const hideToolbarStyles = `
  .MuiPickersToolbar-root {
    display: none;
  }
`;

  const hideButtonsStyles = `
    .MuiDialogActions-root {
      display: none;
    }
    .css-nk89i7-MuiPickersCalendarHeader-root{
      margin-top:8px;
    }
  `;

  const { meetings, status, error } = useSelector((state) => state.meetingInfo);
  const handleDateChange = (newValue) => {

    let candidate = {};
    if (newValue[1] != null) {
      candidate = {
        "from_date": newValue[0].format('YYYY-MM-DD'),
        "to_date": newValue[1].format('YYYY-MM-DD'),
      }
    }
    else {
      candidate = {
        "from_date": newValue[0].format('YYYY-MM-DD'),
        "to_date": newValue[0].format('YYYY-MM-DD')
      }
    }

    dispatch(getMeetingDetails(candidate))

  
  };

  useEffect(() => {
    
    dispatch(getMeetingDetails({ from_date: dayjs().format('YYYY-MM-DD'), to_date: dayjs().add(7, "day").format('YYYY-MM-DD') }));
  }, [dispatch]);

  useEffect(() => {
    console.log("NewValue-------------->" + JSON.stringify(meetings));
  }, [meetings]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <style>{hideSelectDateRangeStyles}</style>
      <style>{hideSelectedDateStyles}</style>
      <style>{hideToolbarStyles}</style>
      <style>{hideButtonsStyles}</style>
      <StaticDateRangePicker
        defaultValue={[dayjs(), dayjs().add(7, "day")]}
        onChange={handleDateChange}
        sx={{
          [`.${pickersLayoutClasses.contentWrapper}`]: {
            alignItems: "center",
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default CalendarProject;
