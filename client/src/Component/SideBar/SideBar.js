import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './SideBar.css'

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import PropTypes from 'prop-types';

const SideBar = ({ logout, isAuthenticated }) => {
  const [ btnState, setBtnState ] = useState({
    isClick: true,
    classBtn: "sidebar",
    btn: "btnSide"
  })

  const { btn, classBtn, isClick } = btnState;

  const handleClick = () => { 
    isClick ? (
        setBtnState({ ...btnState, classBtn: "active", btn: "btnClose", isClick: !isClick })
      ) : (
        setBtnState({ ...btnState, classBtn: "sidebar", btn: "btnSide", isClick: !isClick })
      );
  }

  // Event listener
  const handleLogout = async e => {
    e.preventDefault();

    logout();
  };

  return (
    <div className={classBtn}>
      { !isAuthenticated ? (
      <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
      </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/' onClick={handleLogout}>Logout</Link></li>
      </ul>
      )}
      <button className="sidebarBtn" onClick={handleClick}>
          <span className={btn}></span>
        </button>
    </div>
  );
}

SideBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(SideBar);
