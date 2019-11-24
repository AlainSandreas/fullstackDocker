import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import './Login.css';

// Connect to connect to REDUX
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert'
  
const Register = ({ setAlert, register, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        formErrors: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: ""
        }
    })

    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }
  
    const { firstName, lastName, email, password, password2, formErrors } = formData;

    const emailRegex = RegExp( /^[a-zA-Z0-9-._-]+@[a-zA-Z]+(?:\.[a-z]+)*$/ );
    
    const formValid = ({ formErrors, ...rest }) => {
      let valid = true;
      // validate form errors being empty
      Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
      });  

      Object.values(rest).forEach(val => {
        val === '' && (valid = false);
      })
      return valid;
    };

    const handleSubmit = async e => {
      e.preventDefault();

      console.log(password !== password2)
      console.log(formData)
      if(password !== password2) {
        setAlert("Password don't match", 'failed')
      } else {
        if (formValid(formData)) {
          register({ firstName, lastName, email, password })
        } else {
          setAlert('Register failed', 'failed')
        }
      }
    };
  
    const handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
  
      switch (name) {
        case "firstName":
          formErrors.firstName =
            value.length < 3 ? "Minimum 3 characaters required" : "";
          break;
        case "lastName":
          formErrors.lastName =
            value.length < 3 ? "Minimum 3 characaters required" : "";
          break;
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
        <RegisterForm 
            formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
)}


Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

// Have to export connect
export default connect(mapStateToProps, { setAlert, register })(Register);
