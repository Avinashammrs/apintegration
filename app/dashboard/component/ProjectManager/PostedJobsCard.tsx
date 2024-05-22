import React from 'react';

function PostedJobsCard(props: any) {
    return (
        <div className="col-lg-3 col-md-4 px-2">
            <div className="shadow bg-white p-3 mt-3">
                <div className="d-flex pb-2 align-items-center">
                    <img className="h-[15px]" src={props?.job_id?.jobRequest_IconURL} alt="" />
                    <h4 className="text-[16px] Poppins-Regular ms-2 text-[#091316]">{props?.job_id?.jobRequest_Title}</h4>
                </div>
                <hr className="my-1" />
                <h6 className="text-[14px] Poppins-Regular text-[#091316] text-center mt-3">{props.job_id?.jobRequest_Role}</h6>
                <div className="p-1 w-[55px] h-[55px] my-3 mx-auto align-items-center flex justify-center" style={{ backgroundColor: "#D9E4EF" }}>
                    <h6 style={{ color: "#0A66C2" }} className="Poppins-Bold text-[20px]">{props?.job_id?.jobRequest_TotalVacancy}</h6>
                </div>
                <h6 className="text-[14px] Poppins-Regular text-[#091316] text-center">{props.job_id?.jobRequest_Role}</h6>
                <hr />
                <div className="flex justify-between align-items-center">
                    <div className="flex align-items-center">
                        <img className="h-3 mr-2" src="image/arrowiocn.png" alt="" />
                        <span className="text-[8px] md:text-[10px]"><span className="text-blue">{props?.percentage} 0%(STATIC) </span> vs Last Week</span>
                    </div>
                    <span className="text-[8px] md:text-[10px]">{props?.time}8MINS AGO(staTIC)</span>
                </div>
            </div>
        </div>
    );
}

export default PostedJobsCard;
