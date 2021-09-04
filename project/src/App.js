// import required dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Navbar and Map components
import Navbar from "./Navbar";
import Map from "./API/google_map/map";
import Calendar from "./API/google_calendar/Calendar";
import Home from "./home/home";

// defined the map function
function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
