import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavBar from './Navbar';

import Home from './content/home';
import RegisterParty from './content/Update/RegisterParty';
import RegisterVoter from './content/Update/RegisterVoter';
import RegisterElection from './content/Update/RegisterElection';
import RegisterUser from './content/Update/RegisterUser';
import RegisterCandidates from './content/Update/RegisterCandidates';
import Vote from './content/Update/Vote';
import ViewData from './content/List/selectAll';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
      <Route path="/" element={<ViewData />} />
      <Route path="/viewData" element={<ViewData />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/registerParty" element={<RegisterParty />} />
      <Route path="/registerVoter" element={<RegisterVoter/>}/>
      <Route path="/registerElection" element={<RegisterElection />} />
      <Route path="/registerUser" element={<RegisterUser/>}/>
      
     
      <Route path="/registerCandidates" element={<RegisterCandidates />} />
            </Routes>
       
    </div>
  );
}

export default App;
