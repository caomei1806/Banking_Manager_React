import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Nav.scss'
const Nav = () => {
	return (
		<nav>
			<Link to='/login' className='navLink'>
				Sign in
			</Link>
			<Link to='/register' className='navLink'>
				Sign up
			</Link>
		</nav>
	)
}

export default Nav
