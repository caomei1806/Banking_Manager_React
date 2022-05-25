import React, { useState } from 'react'
import { User } from '../../types'
import { Role } from '../../types/enums'
import { register } from '../../services/authenticationServices'
import Slogan from '../shared/Slogan'
import '../../styles/Form.scss'

const defaultUser: User = {
	id: 0,
	name: '',
	email: '',
	password: '',
	role: Role.user,
}
const userFormSlogan = {
	title: 'Banking Manager App',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. \nRepellendus eius explicabo perferendis distinctio voluptatem  suscipit quas sequi.\n Libero temporibus rerum delectus \ndistinctio quo, sapiente, incidunt earum labore \nsunt quaerat repellat quod praesentium. \nMaxime id provident similique? \nLaudantium qui ipsum blanditiis.',
	imageURL: 'moneySag.png',
	quote:
		'Wealth is the ability to fully experience life. \t \n \t \t — Henry David Thoreau',
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
							type='email'
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
						<input
							type='submit'
							value='sign up'
							className='btn-submit'
							data-url='register'
						/>
					</div>
				</div>
			</form>
			<Slogan slogan={userFormSlogan} />
		</div>
	)
}

export default Register
