import React from "react"
import { Router, Location } from "@reach/router"
import { connect } from 'react-redux'

import LoginPage from "../templates/login-page"
import HomePage from "../templates/home-page"
import EventPage from "../templates/event-page"
import SchedulePage from "../templates/schedule-page";

import PrivateRoute from "../routes/PrivateRoute"
import PublicRoute from "../routes/PublicRoute"

const App = ({ isLoggedUser }) => (
  <Location>
    {({ location }) => (
      <Router basepath="/a" >
        <PrivateRoute path="/" component={HomePage} isLoggedIn={isLoggedUser} location={location} />
        <PrivateRoute path="/event/:eventId" component={EventPage} isLoggedIn={isLoggedUser} location={location} />
        <PublicRoute path="/schedule" component={SchedulePage} location={location} />
        <LoginPage path="/login" location={location} />
      </Router>
    )}
  </Location>
)

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  backUrl: loggedUserState.backUrl,
})

export default connect(mapStateToProps)(App)