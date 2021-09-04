// import required dependencies
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav>
			<li>
				<Link to='/map'>Google Map API</ Link>
			</li>
		</nav>
	)
}

export default Navbar