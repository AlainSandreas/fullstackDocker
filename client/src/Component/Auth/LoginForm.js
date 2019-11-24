import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = ({ handleSubmit, formErrors, handleChange }) => {
    return (
        <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
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
                noValidate
                onChange={handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Login</button>
              <Link to="/register"><small>Don't have an account?</small></Link>
            </div>
          </form>
        </div>
      </div>
    )
}

export default LoginForm;