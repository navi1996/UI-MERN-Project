import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import the necessary modules here
import CreateBooking from "./components/CreateBooking";
import GetBooking from './components/GetBookings'
import updateBooking from './components/updateBooking'
// DO NOT REMOVE THE BELOW CODE
import Evaluator from './components/evaluator';
import "./App.css";

class AppComp extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* DO NOT REMOVE THE BELOW COMPONENT STATEMENT */}
          <Evaluator></Evaluator>
          <nav className="navbar navbar-expand-lg navbar-light  bg-custom">
            <span className="navbar-brand">Infy Airlines</span>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/bookFlight">
                  Book Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewBookings">
                  View Bookings
                </Link>
              </li>

            </ul>
          </nav>
          {/* code the required routes here */}
    <Switch>
        <Route exact path="/bookFlight" component={CreateBooking}/>
        <Route  path="/updateBooking/:bookingId" component={updateBooking}/>
        <Route exact path="/viewBookings" component={GetBooking}/>
        <Route path="/" component={CreateBooking}/>
    </Switch>

        </div>
      </Router>
    );
  }
}

export default AppComp;