"use client";
import Link from "next/link";
import { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/type";


function CandidateStatus() {


  const { meetings } = useSelector((state:RootState) => state.meetingInfo);

  const[candidate,setCandidate] = useState([]);

  useEffect(() =>{
    setCandidate(transformMeetings([...meetings]));
  },[meetings]);

  function transformMeetings(data: any) {
    return data.map((data: any )=> ({
        jobID: data.job_id ? data.job_id.id : null,
        name: data.user_det && data.user_det.candidate ?
            `${data.user_det.candidate.candidate_firstName} ${data.user_det.candidate.candidate_lastName}` : null,
        role: data.job_id ? data.job_id.jobRequest_Role : null,
        status: data.status,
        isActive: data.user_det && data.user_det.candidate ?
        data.user_det.candidate.candidate_isActive : null
    }));
}





  return (
    <div className=" bg-white p-3 table-responsive ">
      <div>
        <table className="table CandidateStatus">
          <thead>
            <tr>
              <th scope="col">Job ID</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">1st Level</th>
              <th scope="col">2nd Level</th>
              <th scope="col">3rd Level</th>
              <th scope="col">4th Level</th>
              <th scope="col">Total Marks</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidate?.map((list:any,index) => (
              <tr key={"card"+index}>
                <td>{list?.jobID}</td>
                <td>{list?.name}</td>
                <td>{list?.role}</td>
                <td>{"5/5"}</td>
                <td>{"4/5"}</td>
                <td>{"3/5"}</td>
                <td>{"2/5"}</td>
                <td>{"1/5"}</td>
                {list?.status === "Passed" ? (
                  <td>
                    <button className="bg-[#cbffd7] rounded-2 px-2 py-1 text-green-700">
                      {list?.status.toUpperCase()}
                    </button>
                  </td>
                ) : null}

                {list?.status === "Active" || list?.status === "active" ? (
                  <td>
                    <button className="bg-[#fff3f3] rounded-2 px-2 py-1 text-yellow-400">
                      {list?.status.toUpperCase()}
                    </button>
                  </td>
                ) : null}

                {list?.status === "Failed" ? (
                  <td>
                    <button className="bg-[#E73B3B26] rounded-2 px-2 py-1 redColor">
                      {list?.status.toUpperCase()}
                    </button>
                  </td>
                ) : null}

{list?.status === null ? (
                  <td>
                    
                  </td>
                ) : null}

                <td>
                  <Link className="btn" href={`CandidatesStatus3/${list?.jobID}`}>
                    <img src="image/eye-black.png" alt="" className="text-muted text-dark" />
                    {/* <i className="fa fa-eye text-muted" aria-hidden="true"></i> */}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CandidateStatus;
