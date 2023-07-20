import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"


export default function RegisterElection() {
  
const [StationName,setStationName]=useState("");
const [StationCode,setStationCode]=useState("");
const [statrDate,setstatrDate]=useState("");
const [endDate,setendDate]=useState("");
const [status,setstatus]=useState("");
const [region,setregion]=useState("");

const [ErrorMessage, setErrorMessage] = useState("")
 


  
  let history = useNavigate();

  async function addItem(params) {
    setErrorMessage("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify(
      {
       "StationName": StationName,  // "Mircha Tabiya 23",
       "StationCode": StationCode,  // "NBEAA23",
       "statrDate": statrDate,  // "2021-07-01",
       "endDate": endDate,  // "2021-10-26",
       "status": status,  // "Open",
       "region": region,  // "region1"
       }
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: "no-cors",
      body: raw
    };
    await fetch("http://localhost1/vote/RegisterElection.php", requestOptions
    )
      .then(response => response.json())
      .then(data => {
        setErrorMessage("Success!");

      }).catch((data) => {
        console.log(data);
        setErrorMessage("Can't handle request now, please try again later");
      });
    history('/')
  }

  return (
    <div className="container col-md-5">
      <div className="row justify-content-center p-3 rounded  bg-secondary m-3 ">
        <div className="col-md-8">


          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Station Name"
            value={StationName} onChange={(e) => { setStationName(e.target.value) }} />
          <input
            type="number"
            className="form-control m-3"
            placeholder="Enter Station Code"
            value={StationCode} onChange={(e) => { setStationCode(e.target.value) }} />

          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Status"
            value={status} onChange={(e) => { setstatus(e.target.value) }} />
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Region"
            value={region} onChange={(e) => { setregion(e.target.value) }} />
         <div className="text-light">Start Date</div>
        <DatePicker
        
        label="Enter Start Date "
            className=" form-control text-dark m-3 "
            selected={statrDate}
            dateFormat="Pp"
            onChange={(date) => setstatrDate(date)}
          />
          
            <div className="text-light">End Date</div>
        <DatePicker
        
        label="Enter End Date "
            className=" form-control text-dark m-3 "
            selected={endDate}
            dateFormat="Pp"
            onChange={(date) => setendDate(date)}
          />
          <div className="m-3" >{ErrorMessage}</div>
          <button onClick={addItem} className='btn btn-warning col-md-5 p-2 m-3'>Done</button>
        </div>
        
      </div>
    </div>
  );
}