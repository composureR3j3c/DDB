import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg p-2 mb-5 ">
        <a className="navbar-brand justify-content-center" href="#">
          Voting System
        </a>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav mx-auto ">
          <li className="nav-item active">
              <a className="nav-link text-warning mr-5 " href="/">
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link " href="/viewData">
                View Data
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/vote">
                Vote
              </a>
            </li>
 <li className="nav-item active">
              <a className="nav-link" href="/registerParty">Register Party</a></li>
 <li className="nav-item active">
              <a className="nav-link" href="/registerVoter">Register Voter</a></li>
 <li className="nav-item active">
              <a className="nav-link" href="/registerElection">Register Election</a></li>
 <li className="nav-item active">
              <a className="nav-link" href="/registerUser">Register User</a></li>
 <li className="nav-item active">
              <a className="nav-link" href="/registerCandidates">Register Candidates</a></li>
           

          </ul>
        </div>
      </nav>
    </div>
  );
}
