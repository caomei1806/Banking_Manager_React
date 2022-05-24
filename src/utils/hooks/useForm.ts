import React from 'react'
import { useGlobalContext } from '../../context'
import { handleSubmit } from '../handleSubmit'
const useForm = () => {
	const {user, setUser, setErrors} = useGlobalContext()
 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value })
		e.target.classList.remove('error')
		e.target.parentElement?.classList.remove('error')
		setErrors([])
	}
	return {
		handleChange,
		handleSubmit
	}
}

export default useForm