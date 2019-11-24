import React from 'react';
import { Link } from 'react-router-dom'

const RegisterForm = ({ handleChange, handleSubmit, formErrors, formData }) => {
  const { firstName, lastName, email, password, password2 } = formData;

  return (
    <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                value={firstName}
                noValidate
                onChange={handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                noValidate
                onChange={handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                noValidate
                onChange={handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                noValidate
                onChange={handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password2">Confirm Password</label>
              <input
                className={formErrors.password2.length > 0 ? "error" : null}
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={password2}
                noValidate
                onChange={handleChange}
              />
              {formErrors.password2.length > 0 && (
                <span className="errorMessage">{formErrors.password2}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <Link to="/login"><small>Already have an account?</small></Link>
            </div>
          </form>
        </div>
      </div>
  );
}

export default RegisterForm;
