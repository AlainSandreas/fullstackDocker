import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { useSpring, animated } from 'react-spring';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import PropTypes from 'prop-types';

const CollapseMenu = ({ handleNavbar, navbarState, logout, isAuthenticated }) => {
  const { open } = useSpring({ open: navbarState ? 0 : 1 });

  // Event listener
  const handleClick = async e => {
    e.preventDefault();

    logout();
  };

  if (navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
      }}
      >
        { !isAuthenticated ? (
            <NavLinks>
              <li><Link to="/" onClick={handleNavbar}>Home</Link></li>
              <li><Link to="/login" onClick={handleNavbar}>Login</Link></li>
              <li><Link to="/register" onClick={handleNavbar}>Register</Link></li>
            </NavLinks>
          ) : (
            <NavLinks>
               <li><Link to="/" onClick={handleNavbar}>Home</Link></li>
              <li><Link to="/" onClick={handleClick}>Logout</Link></li>
            </NavLinks>
          )
      }
      </CollapseWrapper>
    );
  }
  return null;
};

CollapseMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(CollapseMenu);

const CollapseWrapper = styled(animated.div)`
  background: #2d3436;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;
  
  & li {
    transition: all 200ms linear 0s;
  }
  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #0eb1d2;
      border-bottom: 1px solid #0eb1d2;
    }
  }
`;