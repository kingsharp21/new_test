import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({showPreferenceModel}) {
    const storedItem = localStorage.getItem("new_aggregator_user");
    const userData = JSON.parse(storedItem);

    const [showMenu, setShowMenu] = useState(false);



    const navigate = useNavigate();


  const handleAvatarClick = () => {
    setShowMenu(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
    return ( 
        <nav style={{ width: '100%', height: '74px', position: 'fixed', zIndex: 99, top: 0, padding: '.5rem' }}>
        <div style={{ background: 'white', maxWidth: '1100px', height: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
          <h1>Logo</h1>
          <div className="dropdown">

            <div className="avatar avatar-sm avatar-circle" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
              <img className="avatar-img" src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
              <span className="avatar-status avatar-sm-status avatar-status-success" />
            </div>

            <div className={`dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account ${showMenu ? 'show' : 'hide'} `} aria-labelledby="accountNavbarDropdown" style={{ width: '16rem', opacity: 1, transform: 'translateY(10px) translateY(-10px)', transition: 'transform 300ms ease 0s, opacity 300ms ease 0s' }} data-bs-popper="static">
              <div className="dropdown-item-text">
                <div className="d-flex align-items-center">
                  <div className="avatar avatar-sm avatar-circle">
                    <img className="avatar-img" src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-0">{userData.name}</h5>
                    <p className="card-text text-body">{userData.email}</p>
                  </div>
                </div>
              </div>
              <span onClick={()=>showPreferenceModel(true)} style={{ cursor: 'pointer' }} className="dropdown-item">Settings</span>


              <span style={{ cursor: 'pointer' }} className="dropdown-item" onClick={handleLogout}>Sign out</span>
            </div>
          </div>

        </div>
      </nav>
     );
}

export default Navbar;