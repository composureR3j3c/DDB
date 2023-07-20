import React, { useState, useEffect } from "react";
import deleteData, { UpdateCurr } from "../../helpers/deleteData";
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

export default function SelectElection() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const[ModalTitle,setModalTitle]=useState()
  const[ModalId,setModalId]=useState()
  const[ModalBuy,setModalBuy]=useState()
  const[ModalSell,setModalSell]=useState()

  const[ErrorMessage,setErrorMessage]=useState()
  const[RegionInclusion,setRegionInclusion]=useState("all")
  function openModal(id,name,rate ,sell) {
    console.log("id##################",id)
    setModalTitle(name)
    setModalId(id)
    setModalBuy(rate)
    setModalSell(sell)
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#ffffff";
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

  const [Buy, setBuy] = useState();
  const [Sell, setSell] = useState()
  const[ID,setID]=useState()

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
      TargetTable:"election",
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

    
    
    return (
      <tr key={res.CANDIDATE_ID}>
      <td className="p-2">{res.ID}</td>     
      <td className="p-2">{res.STATIONNAME}</td>  
      <td className="p-2">{res.STATIONCODE}</td>  
      <td className="p-2">{res.REGION}</td> 
      <td className="p-2">{res.STATRDATE}</td>
      <td className="p-2">{res.ENDDATE}</td>
      <td className="p-2">{res.STATUS}</td>
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
  
    bodyHeader1= <tr><th scope="col">
        <p className="p-2">ID </p></th>
    <th scope="col">
        <p className="p-2">STATIONNAME</p></th> 
    <th scope="col">
        <p className="p-2">STATIONCODE</p></th> 
    <th scope="col">
        <p className="p-2">REGION</p></th> 
    <th scope="col">
        <p className="p-2">STATRDATE</p></th> 
    <th scope="col">
        <p className="p-2">ENDDATE</p></th>
    <th scope="col">
        <p className="p-2">STATUS</p></th></tr>;

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
