import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"


export default function RegisterCandidates() {

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [nationality, setnationality] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [region, setregion] = useState("");
  const [election_id, setelection_id] = useState("");
  const [party_id, setparty_id] = useState("");
  const [status, setstatus] = useState("");

  
  const [ErrorMessage, setErrorMessage] = useState("")

  let history = useNavigate();

  async function addItem(params) {
    setErrorMessage("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
      "fname": fname,// "Dr.Abiy",
      "lname": lname,// "Ahmed",
      "nationality": nationality,// "Ethiopian",
      "address": address,// "Addis Abeba",
      "age": age,// 48,
      "region": region,// "region1",
      "election_id": election_id,// 9227,
      "party_id": party_id,//1001,
      "status": status,//"Disquali"
    }
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: "no-cors",
      body: raw
    };
    await fetch("http://localhost1/vote/RegisterCandidates.php", requestOptions
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
            value={fname} onChange={(e) => { setfname(e.target.value) }} />
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Last Name"
            value={lname} onChange={(e) => { setlname(e.target.value) }} />
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Nationality"
            value={nationality} onChange={(e) => { setnationality(e.target.value) }} />
           <input
            type="text"
            className="form-control m-3"
            placeholder="Enter address"
            value={address} onChange={(e) => { setaddress(e.target.value) }} />
          
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter age"
            value={age} onChange={(e) => { setage(e.target.value) }} />
          
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter region"
            value={region} onChange={(e) => { setregion(e.target.value) }} />
          
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter election_id"
            value={election_id} onChange={(e) => { setelection_id(e.target.value) }} />
          
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter party_id"
            value={party_id} onChange={(e) => { setparty_id(e.target.value) }} />
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter status"
            value={status} onChange={(e) => { setstatus(e.target.value) }} />


          <div className="m-3" >{ErrorMessage}</div>
          <button onClick={addItem} className='btn btn-warning col-md-5 p-2 m-3'>Done</button>
        </div>
      </div>
    </div>
  );
}