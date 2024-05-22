"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/type";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function GraphProject() {

const [data,setData] = useState([]);
const { meetings } = useSelector((state:RootState) => state.meetingInfo);

const transformData = (apiResponse:any) => {
  const dateCounts:any = {};
  

  apiResponse.forEach((meeting:any )=> {
      const date = new Date(meeting.start).toISOString().split('T')[0]; 

      if (dateCounts[date]) {
          dateCounts[date]++;
      } else {
          dateCounts[date] = 1;
      }
  }
  );
  const result:any = Object.keys(dateCounts).map(date => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { date: formattedDate, Interviews: dateCounts[date] };
});

return result;
};

useEffect(() =>{
  setData(transformData(meetings));

},[meetings])



  

  // const data = [
  //   { date: "Feb 1", Interviews: 2 },
  //   { date: "Feb 2", Interviews: 5 },
  //   { date: "Feb 3", Interviews: 2 },
  //   { date: "Feb 5", Interviews: 6 },
  //   { date: "Feb 8", Interviews: 1 },
  //   { date: "Feb 10", Interviews: 4 },
  // ];
  const CustomLegend = () => null;

  return (
    <div className="TotalEmployees shadow bg-white rounded-3 p-3 w-100">
      <div className="md:flex align-items-center">
        <h3 className="projectManHeading">Scheduled Interviews Info</h3>
        <div className="ml-auto d-flex">
          <button className="btn btn-blue me-3 mx-lg-2">Day</button>
          <button className="btn btn-white me-3 mx-lg-2">Week</button>
        </div>
      </div>
      <hr className="my-2" />
      <div className="d-none d-lg-block " style={{ width: "100%", height: "190px" }}>
        <LineChart
          width={window.innerWidth < 768 ? window.innerWidth - 10 : 810}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Line
            type="monotone"
            dataKey="Interviews"
            stroke="#0B74AD"
            fill="#0B74AD"
            strokeWidth={3}
          />
        </LineChart>
      </div>

      <div className="d-lg-none" style={{ width: "100%", height: "190px" }}>
        <LineChart
          width={window.innerWidth < 768 ? window.innerWidth - 10 : 310}
          height={190}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Line
            type="monotone"
            dataKey="Interviews"
            stroke="#0B74AD"
            fill="#0B74AD"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </div>
  );
}

export default GraphProject;