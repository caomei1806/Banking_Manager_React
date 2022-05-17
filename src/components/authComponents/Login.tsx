import React, { useState } from 'react'
import { login } from '../../services/authenticationServices'
import { useCookies } from 'react-cookie'
import User, { Role } from '../../types/User'
import Slogan from '../shared/Slogan'
import SloganContent from '../../types/SloganContent'

const defaultUser: User = {
	id: 0,
	name: '',
	email: '',
	password: '',
	role: Role.user,
}
const defaultMessage = {
	message: '',
	loading: false,
}
const userFormSlogan = {
	title: 'Banking Manager App',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. \nRepellendus eius explicabo perferendis distinctio voluptatem  suscipit quas sequi.\n Libero temporibus rerum delectus \ndistinctio quo, sapiente, incidunt earum labore \nsunt quaerat repellat quod praesentium. \nMaxime id provident similique? \nLaudantium qui ipsum blanditiis.',
	imageURL: 'foundManagment.png',
	quote:
		'Wealth is the ability to fully experience life. \t \n \t \t — Henry David Thoreau',
}
const Login = () => {
	const [user, setUser] = useState(defaultUser)
	const [message, setMessage] = useState(defaultMessage)
	const [cookies] = useCookies(['access-token'])

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		const formValues = { ...e.target }
		console.log(formValues)

		setMessage({
			message: '',
			loading: true,
		})
		login(user.email, user.password)
	}
	return (
		<div className='form-subpage'>
			<form onSubmit={handleLogin} className='userForm'>
				<h2 className='form-title'>Sign In</h2>
				<div className='form-group'>
					<div className='form-control'>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							id='email'
							name='email'
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>
					</div>
					<div className='form-control'>
						<input type='submit' value='sign in' className='btn-submit' />
					</div>
				</div>
			</form>
			<Slogan slogan={userFormSlogan} />
		</div>
	)
}

export default Login
