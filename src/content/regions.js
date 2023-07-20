import { useState } from "react";

export default function Selector({updateParentVariable,childFunction}){
    const [Div1Class, setDiv1Class] = useState(
        "row justify-content-center d-flex align-items-center "
      );

    return(
    <div className={Div1Class}>
    <div className="col-lg-12 ">
      <select
        className="btn btn-outline-info dropdown-toggle mb-3 m-2 "
        id="mySelect"
            onChange={  (e)  => {
                e.preventDefault();
                 updateParentVariable(e.target.value);
                console.log(e.target.value);
                
            }}
      >
       <option className="dropdown-item p-2" value="all">All</option>
    <option className="dropdown-item" value="region1">Region 1</option>
    <option className="dropdown-item" value="region2">Region 2</option>
    <option className="dropdown-item" value="region3">Region 3</option>
      </select>
      {/* <button onClick={loadBody} type="reload" className={btnClass}>
        Refresh
      </button> */}
      <button className="btn btn-warning"onClick={childFunction} type="reset">Apply Filter</button>
    </div>
    </div>
);
    
}