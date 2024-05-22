import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/type";

function Number_of_Interviews() {
    const { meetings } = useSelector((state:RootState) => state.meetingInfo);

    const countPassedInterviews = (apiResponse:any) => {
        let passedCount = 0;
    
        apiResponse.forEach((meeting:any) => {
            if (meeting.status === "Passed") {
                passedCount++;
            }
        });
    
        return passedCount;
    };

    return (
        <div className="row w-100">
            <div className="col-lg-12 col-md-6 d-flex">
                <div className=" shadow bg-white rounded-3 p-3 d-flex flex-column justify-content-between w-100">
                    <h3 className="projectManHeading">Number of Interviews</h3>
                    <div className="flex">
                        <div>
                            <h1 className="totalCount mt-3 Poppins-SemiBold">{meetings.length}</h1>
                            <div className="flex mt-3 align-items-center ">
                                <img className="h-3 mr-2" src="image/arrowiocn.png" alt="" />
                                <p className="text-[10px] md:text-[12px]"><span>28%</span> vs Last Week</p>
                            </div>
                        </div>
                        <div className="ml-auto mt-4">
                            <img className="h-10" src="image/menmassaeicon.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12 col-md-6 mt-4 d-flex">
                <div className=" shadow bg-white rounded-3 p-3 d-flex flex-column justify-content-between w-100">
                    <h3 className="projectManHeading">Hired Candidates</h3>
                    <div className="flex">
                        <div>
                            <h1 className="totalCount mt-3 Poppins-SemiBold">{countPassedInterviews(meetings)}</h1>
                            <div className="flex mt-3">
                                <img className="h-3 mr-2" src="image/arrowiocn.png" alt="" />
                                <p className="text-[10px] md:text-[12px]"><span>22%</span> vs Last Week</p>
                            </div>
                        </div>
                        <div className="ml-auto mt-4">
                            <img className="h-10" src="image/righticon.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Number_of_Interviews;
