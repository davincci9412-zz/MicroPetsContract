/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import store from './store';
// import jwt_decode from 'jwt-decode';
// import { setCurrentUser, logoutUser } from './actions/authActions';
// import setAuthToken from './utils/setAuthToken';
import Home from './pages/home';
import Shop from './pages/shop';
import Approve from './pages/approve';
import Inventory from './pages/inventory';
import Marketplace from './pages/marketplace';
// import Register from './pages/register';
// import Login from './pages/login';

// Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = './login';
//   }
// } 



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">            
            <Switch>
              {/* <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} /> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/shop" component={Shop} />
              <Route path="/approve/:productId" component={Approve} />
              <Route exact path="/inventory" component={Inventory} />
              <Route exact path="/marketplace" component={Marketplace} />
              <Redirect to="/login" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
