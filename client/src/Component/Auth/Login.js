import React, { useState } from 'react'
import './Login.css'
import LoginForm from './LoginForm';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// Connect to REDUX
import { connect } from 'react-redux';
  
const Login = ({ setAlert, login, isAuthenticated }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
    formErrors: {
      email: "",
      password: ""
    }
    })

    // Redirect if authenticated
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    // Validation form
    const emailRegex = RegExp( /^[a-zA-Z0-9-._-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/ );
    const formValid = ({ formErrors, ...rest }) => {
      let valid = true;

      Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
      });
      Object.values(rest).forEach(val => {
        val === null && (valid = false);
      });
      return valid;
    };

    // Event listener
    const handleSubmit = async e => {
      e.preventDefault();
      const { email, password } = formData;
  
      if (formValid(formData)) {
        login({ email, password });
      } else {
        setAlert('Login failed', 'failed')
      }
    };
  
    const handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let formErrors = { ...formData.formErrors };
  
      switch (name) {
        case "email":
          formErrors.email =
          emailRegex.test(value) ? "" : "Invalid email address";
          break;
        case "password":
          formErrors.password =
            value.length < 8 ? "Minimum 8 characaters required" : "";
          break;
        default:
          break;
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    return (
        <LoginForm 
          formErrors={formData.formErrors} 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
)}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login);
