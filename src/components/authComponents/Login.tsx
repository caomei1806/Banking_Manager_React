import React, { useState } from 'react'
import { login } from '../../services/authenticationServices'
import { useCookies } from 'react-cookie'
import User, { Role } from '../../types/User'
import Error from '../../types/Error'
import Message, { Status } from '../../types/Message'
import Slogan from '../shared/Slogan'
import { validate } from '../../utils/validateForm'
const defaultUser: User = {
	id: 0,
	name: '',
	email: '',
	password: '',
	role: Role.user,
}
// const defaultMessage: Message = {
// 	message: '',
// 	statusCode: null,
// }
// const defaultError: Error = {
// 	message: defaultMessage,
// 	DOMelement: null,
// }
const userFormSlogan = {
	title: 'Banking Manager App',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. \nRepellendus eius explicabo perferendis distinctio voluptatem  suscipit quas sequi.\n Libero temporibus rerum delectus \ndistinctio quo, sapiente, incidunt earum labore \nsunt quaerat repellat quod praesentium. \nMaxime id provident similique? \nLaudantium qui ipsum blanditiis.',
	imageURL: 'fundsManagment.png',
	quote:
		'Wealth is the ability to fully experience life. \t \n \t \t — Henry David Thoreau',
}
const Login = () => {
	const [user, setUser] = useState(defaultUser)
	const [errors, setErrors] = useState<Error[]>([])
	const [cookies] = useCookies(['access-token'])

	const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
		setErrors([])
		e.preventDefault()
		const { email, password } = user
		const cred = { email, password }
		const credentials = Object.entries(cred)
		const formErrors: Error[] = []
		const form = e.currentTarget
		const formElements = form.elements as typeof form.elements & {
			email: { value: string }
			password: { value: string }
		}

		credentials.forEach((cred, index) => {
			const key = cred[0]
			const value = cred[1].toString()
			const message = validate(key, value)
			const inputElement = formElements[index] as HTMLInputElement
			console.log(inputElement)
			if (message.statusCode !== Status.success) {
				formErrors.push({ message: message, DOMelement: inputElement })
			}
		})
		setErrors(formErrors)
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
						<input type='submit' value='sign in' className='btn-submit' />
					</div>
				</div>
			</form>
			<Slogan slogan={userFormSlogan} />
		</div>
	)
}

export default Login
