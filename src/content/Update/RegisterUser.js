import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"


export default function RegisterUser() {

  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const [role,setrole]=useState("")
  
  const [ErrorMessage, setErrorMessage] = useState("")

  let history = useNavigate();

  async function addItem(params) {
    setErrorMessage("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({    
        "username": username,
        "password": password,
        "role": role}
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: "no-cors",
      body: raw
    };
    await fetch("http://localhost1/vote/RegisterUser.php", requestOptions
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
            placeholder="Enter username"
            value={username} onChange={(e) => { setusername(e.target.value) }} />
          <input
            type="number"
            className="form-control m-3"
            placeholder="Enter password"
            value={password} onChange={(e) => { setpassword(e.target.value) }} />

          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter password"
            value={role} onChange={(e) => { setrole(e.target.value) }} />
          
          <div className="m-3" >{ErrorMessage}</div>
          <button onClick={addItem} className='btn btn-warning col-md-5 p-2 m-3'>Done</button>
        </div>
      </div>
    </div>
  );
}