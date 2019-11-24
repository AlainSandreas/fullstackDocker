import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to="/" />
    }

  return (
    <div>
      Dashboard
    </div>
  );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Dashboard);
