import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// import LC from "./linecharts/lineCt";
import "../spinner.css";
import Selector from "../regions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#0f0c29" /* fallback for old browsers */,
    background:
      "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(7, 23, 31) 78.9%)",
    color: "white",
    width: "40%",
    padding:"60px"
  },
};

// export var graphPoints=[]

export default function SelectVoter() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const[ModalTitle,setModalTitle]=useState()
  const[ModalId,setModalId]=useState()
  const[ModalBuy,setModalBuy]=useState()
  const[ModalSell,setModalSell]=useState()

  const [ID,setID]=useState()
  const [FNAME,setFNAME]=useState()
  const [LNAME,setLNAME]=useState()
  const [NATIONALITY,setNATIONALITY]=useState()
  const [ADDRESS,setADDRESS]=useState()
  const [AGE,setAGE]=useState()
  const [REGION,setREGION]=useState()
  const [ELECTION_STATION_ID,setELECTION_STATION_ID]=useState()

  const[ErrorMessage,setErrorMessage]=useState()
  const[RegionInclusion,setRegionInclusion]=useState("all")
  function openModal( ID,FNAME
    ,LNAME
    ,NATIONALITY
    ,ADDRESS
    ,AGE
    ,REGION
    ,ELECTION_STATION_ID) {
                 setID(ID)
                 setFNAME(FNAME)
                 setLNAME(LNAME)
                 setNATIONALITY(NATIONALITY)
                 setADDRESS(ADDRESS)
                 setAGE(AGE)
                 setREGION(REGION)
                 setELECTION_STATION_ID(ELECTION_STATION_ID)
    console.log("id##################",ID)
  
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#ffffff";
  }

  function UpdatVoter(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
      "fname": FNAME,
      "id":ID,
      "lname": LNAME,
      "nationality": NATIONALITY,
      "address": ADDRESS,
      "age": AGE,
      "region": REGION,
      "election_station_id": ELECTION_STATION_ID
  });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders, 
      mode: "no-cors",
      body: raw,
    };
    console.log(requestOptions);
     fetch("http://localhost1/vote/updateVoter.php", requestOptions,)
     
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  function closeModal() {
    setIsOpen(false);
  }
  const updateParentVariable = (newValue) => {
    setRegionInclusion(newValue);
    console.log("#####"+RegionInclusion);
  };

  const [Div1Class, setDiv1Class] = useState(
    "row justify-content-center d-flex align-items-center "
  );
  const [btnClass, setBtnClass] = useState("btn btn-primary m-2  mb-3");

  const [TimeDiffColor, setTimeDiffColor] = useState("text text-primary");



  const [Spinner, setSpinner] = useState(
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
  const [bodyTable, setbodyTable] = useState([]);
  


  var transactionType = {};

  async function loadBody() {
    setbodyTable([]);
    bodyTable1 = [];
    setSpinner(
      <div className="spinner-container mb-3">
        <div className="loading-spinner"> </div>
      </div>
    );
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
      TargetTable:"voter",
      RegionInclusion:RegionInclusion
  });

    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      // mode: "cors",
      body: raw,
    };
    console.log(requestOptions);
     fetch("http://localhost1/vote/selectData.php", requestOptions,)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setbodyTable(data);
        var responseArray = data;
        console.log(bodyTable);
        setSpinner("");
      })
      .catch((data) => {
        console.log(data);
        setErrorMessage("Can't handle request now, please try again later");
      });
  }
var currName=[]
var currID=[]
var finalRows;
  var bodyTable1 = bodyTable.map((res) => {
    return (<tr>
<td>{res.ID}</td>
<td>{res.FNAME}</td>
<td>{res.LNAME}</td>
<td>{res.NATIONALITY}</td>
<td>{res.ADDRESS}</td>
<td>{res.AGE}</td>
<td>{res.REGION}</td>
<td>{res.ELECTION_STATION_ID}</td>    
<td>
          <button
            onClick={() => {
              openModal(res.ID,res.FNAME
                ,res.LNAME
                ,res.NATIONALITY
                ,res.ADDRESS
                ,res.AGE
                ,res.REGION
                ,res.ELECTION_STATION_ID);
            }}
            className="btn btn-warning"
          >
            Update 
          </button>
          <div className="container col-lg-6 ">
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <h2
                ref={(_subtitle) => (subtitle = _subtitle)}
                className="m-2 p-3"
              >
                Id: {ID}
              </h2><div className="m-3 p-3">
                <input
                  type="text"
                  className="form-control m-3 w-75 mb-3"
                  placeholder="Enter FNAME"
                  value={FNAME}
                  onChange={(e) => {
                    // setFNAME(e.target.value)
                    setFNAME(e.target.value);
                  }}
                />

                <input
                  type="text"
                  className="form-control m-3  w-75"
                  placeholder="Enter LNAME"
                  value={LNAME}
                  onChange={(e) => {
                    setLNAME(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control m-3 w-75 mb-3"
                  placeholder="Enter NATIONALITY"
                  value={NATIONALITY}
                  onChange={(e) => {
                    setNATIONALITY(e.target.value)
                    // setBuy(e.target.value);
                  }}
                />

                <input
                  type="text"
                  className="form-control m-3  w-75"
                  placeholder="Enter ADDRESS"
                  value={ADDRESS}
                  onChange={(e) => {
                    setADDRESS(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control m-3 w-75 mb-3"
                  placeholder="Enter AGE"
                  value={AGE}
                  onChange={(e) => {
                    setAGE(e.target.value)
                  }}
                />

                <input
                  type="text"
                  className="form-control m-3  w-75"
                  placeholder="Enter REGION"
                  value={REGION}
                  onChange={(e) => {
                    setREGION(e.target.value);
                  }}
                />
                 <input
                  type="text"
                  className="form-control m-3  w-75"
                  placeholder="Enter ELECTION_STATION_ID"
                  value={ELECTION_STATION_ID}
                  onChange={(e) => {
                    setELECTION_STATION_ID(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  UpdatVoter();
                  closeModal();
                  window.location.reload(false);

                }}
                type="reset"
                className="btn btn-success m-3 con d-flex flex-row-reverse"
              >
                Submit
              </button>
            </Modal> 
</div></td>
    </tr>  
    );
  });

  useEffect(() => {
    let ignore = false;

    if (!ignore) loadBody();
    return () => {
      ignore = true;
    };
  }, []);
  var bodyHeader1;
    bodyHeader1= <tr>
 <th scope="col">
        <p className="p-2">ID</p></th>
 <th scope="col">
        <p className="p-2">FNAME</p></th>
 <th scope="col">
        <p className="p-2">LNAME</p></th>
 <th scope="col">
        <p className="p-2">NATIONALITY</p></th>
 <th scope="col">
        <p className="p-2">ADDRESS</p></th>
 <th scope="col">
        <p className="p-2">AGE</p></th>
 <th scope="col">
        <p className="p-2">REGION</p></th>
 <th scope="col">
        <p className="p-2">ELECTION_STATION_ID</p></th>
        <th></th>
        </tr>;

  return (
    <div className="container">
      {/* <form  method="post"> */}
      <div className="">
        {/* <img src={image} width="320" height="180" className="mb-3" /><br /> */}

        <div className={Div1Class}>
          <div className="col-lg-12 ">
            {/* <p>{Ttype} API calls</p> */}
            {/*             
            <button onClick={loadBody} type="reload" className={btnClass}>
              Refresh
            </button> */}
          </div>
        </div>
      </div>
      <Selector  updateParentVariable={updateParentVariable} childFunction={loadBody}/>
      <div name="cred" className={Div1Class}>
        <div className="col-lg-12 ">
          {Spinner}
          {/* <LC/> */}
          <table className="table table-striped table-dark p-2">
       <thead>{bodyHeader1}</thead>
            <tbody>{bodyTable1}</tbody>
            <tfoot>
              <tr>
                {/* <td>total</td>
                <td></td><td></td>
                <td>{totalIN}</td>
                <td>{totalOut}</td>
                <td>{OverallBal}</td>
                 */}
              </tr>
            </tfoot>
          </table>
          <div className="text-danger"><div className="m-3" >{ErrorMessage}</div></div>
        </div>
      </div>
    </div>
  );
}
