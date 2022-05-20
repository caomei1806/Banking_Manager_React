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
const userFormSlogan = {
	title: 'Banking Manager App',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. \nRepellendus eius explicabo perferendis distinctio voluptatem  suscipit quas sequi.\n Libero temporibus rerum delectus \ndistinctio quo, sapiente, incidunt earum labore \nsunt quaerat repellat quod praesentium. \nMaxime id provident similique? \nLaudantium qui ipsum blanditiis.',
	imageURL: 'fundsManagment.png',
	quote:
		'Wealth is the ability to fully experience life. \t \n \t \t — Henry David Thoreau',
}
const Login = () => {
	const [user, setUser] = useState<User>(defaultUser)
	const [errors, setErrors] = useState<Error[]>([])
	const [cookies] = useCookies(['access-token'])

	const getErrorMessage = (element: HTMLInputElement) => {
		const elementError = errors.map((error) => {
			if (error.DOMelement === element) {
				return error.message.message.toString()
			}
		})
		return elementError[0]
	}

	const displayError = (element: HTMLInputElement) => {
		element.classList.add('error')
		element.parentElement?.classList.add('error')
	}
	const addDataErrorAttribute = (
		element: HTMLInputElement,
		elementMessage: string
	) => {
		element.parentElement?.setAttribute('data-error', elementMessage)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value })
		e.target.classList.remove('error')
		e.target.parentElement?.classList.remove('error')
	}

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
		try {
			if (errors.length === 0) {
				login(user.email, user.password)
			} else {
				errors.map((error) => {
					const element = error.DOMelement as HTMLInputElement
					displayError(element)
					const elementMessage = getErrorMessage(element)
					error.DOMelement?.parentElement?.setAttribute(
						'data-error',
						elementMessage ? elementMessage : ''
					)
					addDataErrorAttribute(element, elementMessage ? elementMessage : '')
				})
			}
		} catch (error) {}
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
							className='input'
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							className='input'
							onChange={(e) => handleChange(e)}
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
