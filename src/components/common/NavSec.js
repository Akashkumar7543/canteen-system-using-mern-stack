import React from 'react';
import '../core/Styles.css'; // Import your CSS file
import SidebarNavbar from './SideNavbar';

const NavSec = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
      <div className="col-md-1 my-auto">
              {/* <Menu /> */}
              <SidebarNavbar/>
            </div>
        <a className="navbar-brand" href="#">Everyday Value</a>
        <a className="navbar-brand" href="#">Recommended</a>
        <a className="navbar-brand" href="/newarival">New Launches</a>
        <a className="navbar-brand" href="#">Flavours Of East</a>
        <a className="navbar-brand" href="#">Combs</a>
        <a className="navbar-brand" href="#">Desserts</a>
      </div>
    </nav>
  );
};

export default NavSec;
