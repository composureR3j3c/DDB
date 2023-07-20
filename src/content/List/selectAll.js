import React, { useState, useEffect } from "react";
import SelectVote from "./selectVote";
import SelectElection from "./selectElection";
import SelectParty from "./selectParty";
import SelectVoter from "./selectVoter";
import SelectCandidate from "./selectcandidate";

export default function MainDiv() {
    const [OpptionS, setOpptionS] = useState();
    const [currentMode,setcurrentMode] = useState();
    

    useEffect(() => {
        let ignore = false;
    
        if (!ignore) changeMainDiv();
        return () => {
          ignore = true;
        };
      }, [OpptionS]);
  function changeMainDiv() {
    console.log(OpptionS)
    if (OpptionS === "1") {
        setcurrentMode(<SelectVote />)
      } else if (OpptionS === "2")  {
        setcurrentMode(<SelectElection />)
      } 
      else if (OpptionS === "3")  {
        setcurrentMode(<SelectParty />)
      }
      else if (OpptionS === "4")  {
        setcurrentMode(<SelectVoter />)
      } 
      else if (OpptionS === "5")  {
        setcurrentMode(<SelectCandidate />)
      }
      else{
        setcurrentMode(<SelectVote />)
      }
      
  }
  
  
  const handleChange = (e) =>  setOpptionS(e.target.value);
    return (
      <div className="MainDiv">
        
        <select
              className="btn btn-outline-info dropdown-toggle mb-3 m-2 "
               id="mySelect"  onChange={(e)=>{ e.preventDefault();changeMainDiv(); setOpptionS(e.target.value); 
                console.log(e.target.value)
                changeMainDiv();
              }} 
                >
                  <div className="dropdown-divider"></div>
              <option value="1" className="dropdown-item p-2">Vote</option>
              <div className="dropdown-divider"></div>
              <option value="2">Election</option>
              <div className="dropdown-divider"></div>
              <option value="3">Party</option>
              <div className="dropdown-divider"></div>
              <option value="4">Voter</option>
              <div className="dropdown-divider"></div>
              <option value="5">Candidate</option>
            </select>
            
            {currentMode}
        
      </div>
    );
  

}