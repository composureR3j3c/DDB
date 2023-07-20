import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

export default function Vote() {

  const [voter_id, setvoter_id,] = useState("")
  const[candidate_id,setcandidate_id]= useState("")
  const[region,setregion]=useState("")
  const [ErrorMessage, setErrorMessage] = useState("")


  let history = useNavigate();

  async function addItem(params) {

    setErrorMessage("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
         "voter_id":voter_id,
         "candidate_id":candidate_id,
         "region":region
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: "no-cors",
      body: raw
    };
    console.log(requestOptions);
    fetch("http://localhost1/vote/Voting.php",
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        setErrorMessage("Success!");

      }).catch((data) => {
        console.log(data);
        setErrorMessage("Can't handle request now, please try again later");
      });
    // history('/')
  }

  return (
    <div className="container col-md-5">
      <div className="row justify-content-center p-3 rounded  bg-secondary m-3 ">
        <div className="col-md-8">


          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter voter_id"
            value={voter_id} onChange={(e) => { setvoter_id(e.target.value) }} />

<input
            type="text"
            className="form-control m-3"
            placeholder="Enter Party Name"
            value={candidate_id} onChange={(e) => { setcandidate_id(e.target.value) }} />

<input
            type="text"
            className="form-control m-3"
            placeholder="Enter Party Name"
            value={region} onChange={(e) => { setregion(e.target.value) }} />


          <div className="m-3" >{ErrorMessage}</div>
          <button onClick={addItem} className='btn btn-warning col-md-5 p-2 m-3'>Done</button>
        </div>
      </div>
    </div>
  );
}