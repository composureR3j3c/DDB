import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

export default function RegisterParty() {

  const [Name, setName,] = useState("")
  const [ErrorMessage, setErrorMessage] = useState("")


  let history = useNavigate();

  async function addItem(params) {

    setErrorMessage("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
      "name": Name
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: "no-cors",
      body: raw
    };
    console.log(requestOptions);
    fetch("http://localhost1/vote/RegisterParty.php",
      requestOptions
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
            placeholder="Enter Party Name"
            value={Name} onChange={(e) => { setName(e.target.value) }} />

          {/* <div className="text-light">Date of Accusation</div>
        <DatePicker
        
        label="Enter Category"
            className=" form-control text-dark m-3 "
            selected={acqDate}
            dateFormat="Pp"
            onChange={(date) => setacqDate(date)}
          /> */}
          <div className="m-3" >{ErrorMessage}</div>
          <button onClick={addItem} className='btn btn-warning col-md-5 p-2 m-3'>Done</button>
        </div>
      </div>
    </div>
  );
}