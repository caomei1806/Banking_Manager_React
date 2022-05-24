import React from 'react'
import { useCookies } from 'react-cookie'
import { useGlobalContext } from '../../context'
import useForm from '../../utils/hooks/useForm'
import { FormType } from '../../types/enums'
import Slogan from '../shared/Slogan'
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

	const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
		try {
			handleSubmit(e, FormType.loginForm, user, setUser, errors, setErrors)
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
