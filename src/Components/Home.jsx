import React from 'react';
import logo from "../Assests/xwave-icon.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = () => {
  return (
    <div className="px-3 py-2 border-bottom mb-3">
      <div className="container d-flex flex-wrap justify-content-center">
        <form className="col-12 col-lg-auto mb-2 mb-lg-auto me-lg-auto" role="search">
          <img className="img-fluid" src={logo} alt="Logo" />
        </form>
        <div className="text-end">
          <button className="btn btn-light me-2" style={{ color: "#1976D2" }}>Home</button>
          <button className="btn btn-primary mx-3" style={{ backgroundColor: "#1A1B4B" }}>My Jobs</button>
          <AccountCircleIcon className="fs-1" />
        </div>
      </div>
    </div>
  );
};

export default Header;
