import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/" title="Home"><FontAwesomeIcon icon={faHome}/></NavLink>
          </li>
          <li className="nav-item">
            
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ActionMenu
            </a>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/AddNew">Add Product</NavLink></li>
              
            </ul>
          </li>
         
        </ul>
        
      </div>
    </div>
  </nav>
  );

}
export default Header;
