// import required dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Navbar and Map components
import Navbar from "./API/nav/Navbar";
import Map from "./API/map/Map";
// import Calendar from "./API/calendar/Calendar";
import Home from "./API/home/home";
import Contact from "./API/contact/Contact";
import Person from "./API/person/Person";
import Record from "./API/record/Record";
import Search from "./API/search/Search";
import Error from "./API/error/Error";

// defined the map function
function App() {
  return (
    <div className="container">
      {/* define the route */}
      {/* TODO: login route and regist route */}
      <Router>
        {/* <NavbarTop /> */}
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
          {/* <Route path="/calendar">
            <Calendar />
          </Route> */}
          <Route exact path="/record">
            <Record />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/setting">
            {<Person />}
          </Route>
          <Route path="*">
            <Error msg={"AHHHHHHHH"} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
