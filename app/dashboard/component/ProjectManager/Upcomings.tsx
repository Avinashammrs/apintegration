"use client"
import React from "react";
import Link from "next/link";
import { dashboardSelector } from "@/store/reducers/dashboard";
import { useEffect ,useState} from "react";
import {  useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "@/store/reducers/type";

function AppointmentItem({ date, title, creator, time, colorName,...props }: any) {
  return (
    <div className="row mt-4 align-items-center ">
      <div className="col-3 pe-0">
        <div className={`bg-[${colorName}] text-center rounded-2 py-3 px-2`}>
          <h6 className="text-[12px] text-blue">{moment(props?.start_date)?.format("DD")}</h6>
          <h6 className="text-[12px] text-blue">{moment(props?.start_date)?.format("MMM")}</h6>
        </div>
      </div>

      <div className="col-6 pe-0">
        <h6 className="text-[12px] Poppins-Medium">{props?.role}</h6>
        <h6 className="text-[11px] mt-1">
          Created by{" "}
          <Link className="text-blue" href="/" prefetch>
            {props?.interviewer}
          </Link>
        </h6>
        <h6 className="text-[9px] text-muted mt-1">{time}static</h6>
      </div>

      <div className="col-3 text-end">
        <button className=" btn btn-blue btn-sm text-[13px!important]">
          Details
        </button>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {

  const { meetings } = useSelector((state: RootState) => state.meetingInfo);

  const[upComingMeetings,setUpComingMeetings] = useState([]);

  function extractupComingMeetingsDetails(data:any) {
    return data.map((data: any,index:number) => ({
        start_date: data.start ? data.start : null,
        interviewer: data.user_det ? data.user_det.handled_by.username : null,
        role: data.job_id ? data.job_id.jobRequest_Role : null
    }));
}

  useEffect(()=>{
    setUpComingMeetings(extractupComingMeetingsDetails([...meetings]));
  },[meetings]);
  
  return (
    <div>
      <div className="flex justify-between align-items-center ">
        <h5>Upcomings</h5>
        <Link className="text-blue text-[14px]" href="/P_M_Upcomings" prefetch>
          <u>View All</u>
        </Link>
      </div>

      {upComingMeetings?.map((appointment:any, index) => (
        <AppointmentItem key={index} {...appointment} />
      ))}
    </div>
  );
}
