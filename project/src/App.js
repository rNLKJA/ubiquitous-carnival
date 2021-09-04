// import required dependencies
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import Navbar and Map components
import Navbar from './Navbar'
import Map from './map/map'

// defined the map function
function App() {
  return (
    <Router>
			<Navbar />
			<Switch>
				<Route exact path='/map'>
					<Map />
				</Route>
			</Switch>
		</Router>
  );
}

export default App;
