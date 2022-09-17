import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import '../../styles/Nav.scss'

const Nav = () => {
	const { user } = useGlobalContext()
	const isLoggenIn = user.id !== 0
	useEffect(() => {}, [user])
	return (
		<nav>
			{!isLoggenIn && (
				<Link to='/login' className='navLink'>
					Sign in
				</Link>
			)}
			{!isLoggenIn && (
				<Link to='/register' className='navLink'>
					Sign up
				</Link>
			)}

			<Link to='/account' className='navLink'>
				Account
			</Link>
			<Link to='/account-holder/create-bank-account' className='navLink'>
				Create account
			</Link>
			<Link to='/logout' className='navLink'>
				Sign out
			</Link>
		</nav>
	)
}

export default Nav
