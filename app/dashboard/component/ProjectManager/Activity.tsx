"use client"
import React from 'react';
import Link from 'next/link';
import { useEffect ,useState} from "react";
import {  useSelector } from "react-redux";

function ActivityItem(props) {
    return (
        <div className="row mt-4 align-items-center ">
            <div className="col-3 pe-0">
                <img className='h-[60px] w-[60px] rounded-full object-cover' src={props?.image} alt="img not available" />
            </div>

            <div className="col-9 pe-0">
                <h6 className="text-[12px] Poppins-Medium">{props?.candidate}<span className='text-blue'> [{props?.role}]</span></h6>
                <h6 className="text-[11px] mt-1">Created by <Link href="/" prefetch>{props?.interviewer}</Link></h6>
                <h6 className="text-[9px] text-muted mt-1">{props.time}static</h6>
            </div>
        </div>
    );
}

export default function Activity() {
const { meetings } = useSelector((state) => state.meetingInfo);

  const[candidate,setCandidate] = useState([]);

  function extractCandidateDetails(data) {
    return data.map((data: any,index:number) => ({
        candidate: data.user_det ? data.user_det.candidate ?  data.user_det.candidate.candidate_firstName + " "+  data.user_det.candidate.candidate_lastName: null :null,
        interviewer: data.user_det ? data.user_det.handled_by.username : null,
        role: data.job_id ? data.job_id.jobRequest_Role : null,
        image: `https://randomuser.me/api/portraits/men/${index+5}.jpg`
    }));
}

  useEffect(()=>{
    setCandidate(extractCandidateDetails([...meetings]));
  },[meetings]);

    return (
        <div>

            <div className="flex justify-between align-items-center ">
                <h5>Activity</h5>
                <Link prefetch className='text-blue text-[14px]' href="/P_M_Activity">
                    <u>View All</u>
                </Link>
            </div>

            {candidate.map((data, index) => (
                <ActivityItem key={index} {...data} />
            ))}
        </div>
    );
}
