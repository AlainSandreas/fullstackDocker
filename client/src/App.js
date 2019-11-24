import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import Landing from './Component/Layout/Landing';
import Dashboard from './Component/Dashboard/Dashboard';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Layout/Footer/Footer';
import SideBar from './Component/SideBar/SideBar';
import Alert from './Component/Layout/Alert';

import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';

import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () =>  {
  const [ navbarState, setNavbarState ] = useState({
    navbarOpen: false
  })

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  const handleNavbar = () => {
    setNavbarState({ ...navbarState, navbarOpen: !navbarState.navbarOpen });
  }

  const Redirection = () => (
    <Redirect to="/" />
  )

  return (
    <Provider store={store}>
    <Router>
    <Navbar 
        navbarState={navbarState.navbarOpen} 
        handleNavbar={handleNavbar} 
      />
      <SideBar />
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={Redirection} />
      </Switch>
      
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
