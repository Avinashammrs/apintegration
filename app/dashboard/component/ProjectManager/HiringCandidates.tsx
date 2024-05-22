import React from "react";
import Link from "next/link";
import { useEffect ,useState} from "react";
import {  useSelector } from "react-redux";

function AppointmentItem(props) {
  return (
    <div className="row mt-4 align-items-center ">
      <div className="col-3 pe-0">
        <img
          className="h-[60px] w-[60px] rounded-full object-cover"
          src={props?.image}
          alt=""
        />
      </div>

      <div className="col-6 pe-0">
        <h6 className="text-[12px] text-[#091316] Poppins-Medium">
          {props?.role}
        </h6>
        <h6 className="text-[10px] text-[#091316] mt-1">{props.position}</h6>
        <h6 className="text-[10px] mt-1">
          Created by{" "}
          <Link href="/" prefetch>
            {props?.createdBy}
          </Link>
        </h6>
      </div>

      <div className="col-3 text-end">
        <button className="btn btnOutlineblue btn-sm text-[13px!important]">
          Details
        </button>
      </div>
    </div>
  );
}

export default function HiringCandidates() {
  
  const { meetings } = useSelector((state) => state.meetingInfo);

  const[recruiters,setRecruiters] = useState([]);

  function extractHiringDetails(data) {
    return data.map((data: any,index:number) => ({
        hiringManagerName: data.user_det ? data.user_det.handled_by.username : null,
        createdBy: data.job_id ? data.job_id.jobRequest_createdBy.username : null,
        role: data.job_id ? data.job_id.jobRequest_Role : null,
        image: `https://randomuser.me/api/portraits/men/${index}.jpg`
    }));
}

  useEffect(()=>{
    setRecruiters(extractHiringDetails([...meetings]));
  },[meetings]);

  return (
    <div>
      <div className="flex justify-between align-items-center ">
        <h5>Hiring Candidates</h5>
        <Link
          className="text-blue text-[14px]"
          prefetch
          href="/HiringCandidates"
        >
          <u>View All</u>
        </Link>
      </div>

      {recruiters.map((recruiter, index) => (
        <AppointmentItem key={index} {...recruiter} />
      ))}
    </div>
  );
}
