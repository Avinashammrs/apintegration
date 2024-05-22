import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/type";



function NumberofVacancies() {


  const [vacancyDetails, setVacancyDetails] = useState(new Map());
  const [totalVacancies, setTotalVacancies] = useState(0);


  const { meetings } = useSelector((state:RootState) => state.meetingInfo);

  const countJobTitles = (apiResponse:any) => {
    const jobDetails : any= {};
    let totalCount = 0;
    if (apiResponse) {
      apiResponse.forEach((meeting:any) => {
        if (meeting.job_id && meeting.job_id.jobRequest_Title) {
          const jobTitle = meeting.job_id.jobRequest_Title;
          const jobVacancy = meeting.job_id.jobRequest_TotalVacancy || 0;
          const jobURL = meeting.job_id.jobRequest_IconURL || "";

          if (jobDetails[jobTitle]) {
            jobDetails[jobTitle].vacancyCount += jobVacancy;
          } else {
            jobDetails[jobTitle] = {
              vacancyCount: jobVacancy,
              jobURL: jobURL,
            };
          }
          totalCount += jobVacancy;
        }
      });
    }
    setTotalVacancies(totalCount);
    return jobDetails;
  };
  

  useEffect(() => {
    const counts = countJobTitles(meetings);
    setVacancyDetails(new Map(Object.entries(counts)));

  }, [meetings]);




  return (
    <>
      <div className="TotalEmployees shadow bg-white rounded-3 p-3 d-flex flex-column justify-content-between h-100">
        <div className="flex align-items-center border-bottom">
          <h3 className="projectManHeading">Number of Vacancies</h3>
          <Link href={"/TotalEmployee0"} prefetch>
            <img className="h-5 ml-5" src="image/eyeicon.png" alt="" />
          </Link>
          <div className="ml-auto">
            <h4 className="totalCount Poppins-SemiBold">{totalVacancies}</h4>
          </div>
        </div>

        <div className="row mt-4">
          {Array.from(vacancyDetails).map(([jobTitle, { vacancyCount, jobURL }], index) => (
            <div className="col-lg-6 mt-3" key={index}>
              <div className="PythonDeveloper border rounded-2 p-2">
                <h4 className="text-[14px] md:text-[16px] text-[#091316]">
                  {jobTitle}
                </h4>
                <div className="d-flex justify-content-between mt-3">
                  <h5 className="text-[25px] md:text-[29px] Poppins-SemiBold">
                    {vacancyCount}
                  </h5>
                  <img src={jobURL} alt="" />
                </div>
              </div>
            </div>
          ))}


        </div>
      </div>
    </>
  );
}

export default NumberofVacancies;
