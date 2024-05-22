import React, { useState, useEffect } from "react";
import { GET_MEETINGS_DETAILS_API } from "@/utils/API";
import dayjs from "dayjs";

function TodayInterviews() {

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await GET_MEETINGS_DETAILS_API({ from_date: dayjs().format('YYYY-MM-DD'), to_date: dayjs().format('YYYY-MM-DD') });

                setMeetings(response.map((meeting: any, index:number) => ({
                    ...meeting,
                    randomImage: `https://randomuser.me/api/portraits/men/${index}.jpg`
                })));
            } catch (error) {
                console.error("Failed to fetch meetings:", error);
            }
        };

        fetchMeetings();
    }, []);


    return (
        <>
        <div className="col-lg-8 me-3">
            {meetings.map((meeting:any, index) => (
                <div key={index} className="row mx-0 border">
                    <div className="col-lg-5 px-0 col-5">
                        <div className="border-end w-100 pt-3 text-center">
                            <img className="w-[100px] h-[100px] rounded-full border-3 border-blue-500 mx-auto" src={meeting.randomImage} alt="" />
                            <h3 className="text-[16px] text-center mt-3">{meeting?.user_det?.candidate?.candidate_firstName} {meeting?.user_det?.candidate?.candidate_lastName}</h3>
                            <h3 className="text-[12px] text-center mt-1">{meeting?.job_id?.jobRequest_Role}</h3>
                            <div className="row w-100 mx-0 border-top mt-3">
                                <div className="col-lg-6 py-3 border-end px-1 text-center col-6">
                                    <img className="mx-auto" src="image/date.png" alt="" />
                                    <h5 className="text-blue text-[10px] mt-2">{dayjs(meeting?.start).format('DD MMM YYYY')}</h5>
                                </div>
                                <div className="col-lg-6 px-1 py-3 text-center col-6">
                                    <img className="mx-auto" src="image/watch.png" alt="" />
                                    <h5 className="text-blue text-[10px] mt-2">{dayjs(meeting?.start).format('hh:mm A')}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 px-0 d-flex col-7">
                        <div className="table-responsive w-100">
                            <table className="table text-center mb-0 tabledataInterVi border-start-0 border-end-0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                    </tr>


                                    <tr>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                        <td>
                                            <span className="mx-1 text-[12px] md:text-[13px]">1st Level:</span>
                                            <span className="mx-1 text-[12px] md:text-[13px]">7/10</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4" colSpan={2} style={{ borderBottom: 0 }}>
                                            <button className="btn btnOutlineblue px-[10px!important] mx-1 mt-2">Reschedule Meeting</button>
                                            <button className="btn btn-blue px-[10px!important] text-[11px] mx-1 mt-2">Join Meeting</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
    )
}

export default TodayInterviews;