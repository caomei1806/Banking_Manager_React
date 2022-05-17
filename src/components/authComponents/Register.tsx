import React, { useState } from 'react'
import User, { Role } from '../../types/User'
import { register } from '../../services/authenticationServices'
const defaultUser: User = {
	id: 0,
	name: '',
	email: '',
	password: '',
	role: Role.user,
}
const Register = () => {
	const [user, setUser] = useState(defaultUser)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		register(user)
	}
	return (
		<div className='form-subpage'>
			<form onSubmit={handleSubmit} className='userForm'>
				<h2 className='form-title'>Sign Up</h2>
				<div className='form-group'>
					<div className='form-control'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							name='name'
							onChange={(e) => setUser({ ...user, name: e.target.value })}
						/>
					</div>
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
						<input type='submit' value='sign up' className='btn-submit' />
					</div>
				</div>
			</form>
		</div>
	)
}

export default Register
