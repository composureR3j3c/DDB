import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"


export default function RegisterVoter() {

  const [FName, setFName,] = useState("")
  const [LName, setLName,] = useState("")

  const [Nat, setNat,] = useState("")
  const [EstatId, setEstatId,] = useState("")
  const [Add, setAdd,] = useState("")
  const [Age, setAge,] = useState("")
  const [Region, setRegion,] = useState("")
  const [DueDate, setDueDate,] = useState(new Date())
  const [Invoice, setInvoice,] = useState("")
  const [ErrorMessage, setErrorMessage] = useState("")

  let history = useNavigate();

  async function addItem(params) {
    setErrorMessage("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({ "fname": FName, "lname": LName, "nationality": Nat, "address": Add, "age": Age, "region": Region, "election_station_id": EstatId }
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: "no-cors",
      body: raw
    };
    await fetch("http://localhost1/vote/RegisterVoter.php", requestOptions
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
            placeholder="Enter First Name"
            value={FName} onChange={(e) => { setFName(e.target.value) }} />
          <input
            type="number"
            className="form-control m-3"
            placeholder="Enter Last Name"
            value={LName} onChange={(e) => { setLName(e.target.value) }} />

          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Nationality"
            value={Invoice} onChange={(e) => { setInvoice(e.target.value) }} />
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Address"
            value={Invoice} onChange={(e) => { setInvoice(e.target.value) }} />
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Region"
            value={Invoice} onChange={(e) => { setInvoice(e.target.value) }} /> <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Election Station Id"
            value={Invoice} onChange={(e) => { setInvoice(e.target.value) }} />
          
          <div className="m-3" >{ErrorMessage}</div>
          <button onClick={addItem} className='btn btn-warning col-md-5 p-2 m-3'>Done</button>
        </div>
      </div>
    </div>
  );
}