import React, { useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useGlobalContext } from '../../context'
import useForm from '../../utils/hooks/useForm'
import { FormType, Status, AlertType, Role } from '../../types/enums'
import Slogan from '../shared/Slogan'
import AlertBox from '../shared/AlertBox'
import { Alert } from '../../types'
import '../../styles/Form.scss'

const userFormSlogan = {
	title: 'Banking Manager App',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. \nRepellendus eius explicabo perferendis distinctio voluptatem  suscipit quas sequi.\n Libero temporibus rerum delectus \ndistinctio quo, sapiente, incidunt earum labore \nsunt quaerat repellat quod praesentium. \nMaxime id provident similique? \nLaudantium qui ipsum blanditiis.',
	imageURL: 'fundsManagment.png',
	quote:
		'Wealth is the ability to fully experience life. \t \n \t \t — Henry David Thoreau',
}
const Login = () => {
	const { user, setUser, errors, setErrors } = useGlobalContext()
	const [cookies] = useCookies(['access-token'])
	const { handleChange, handleSubmit } = useForm()
	const alertRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (errors) {
			if (errors.length > 0) {
				alertRef.current?.classList.remove('hide')
			}
		}
	}, [errors])
	const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		const httpResult = await handleSubmit(
			e,
			FormType.loginForm,
			user,
			setUser,
			errors,
			setErrors
		)

		if (httpResult?.message.statusCode === Status.badRequest) {
			setErrors([httpResult])

			setUser({ id: 0, name: '', email: '', password: '', role: Role.user })
		}
	}
	const generateAlert = (): Alert => {
		const errorsCount = errors?.length ? errors.length : 0
		if (errorsCount > 0) {
			const alert: Alert = {
				message: {
					message: 'Please provide valid credentials',
					statusCode: Status.invalid,
				},
				alertType: AlertType.error,
			}
			return alert
		} else {
			const alert: Alert = {
				message: {
					message: 'Success!',
					statusCode: Status.success,
				},
				alertType: AlertType.success,
			}
			return alert
		}
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
							value={user.email.toString()}
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
							value={user.password.toString()}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='form-control'>
						<input type='submit' value='sign in' className='btn-submit' />
					</div>
					<AlertBox alertContent={generateAlert()} ref={alertRef} />
				</div>
			</form>
			<Slogan slogan={userFormSlogan} />
		</div>
	)
}

export default Login
