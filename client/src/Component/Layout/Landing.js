import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="wrapper">
        <div className="form-wrapper center aligned">
          <h1>Where ?</h1>
          <div className="ui buttons">
            <Link to="/login">
                <button className="ui positive button">Login</button>
            </Link>
            <div className="or"></div>
            <Link to="/register">
                <button className="ui positive button">Register</button>
            </Link>
            </div>     
        </div>
      </div>
    )}

export default Landing
