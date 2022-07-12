import React from 'react'
import { FormType } from '../../types/enums'
import { useGlobalContext } from '../../context'
import { handleSubmit } from '../handleSubmit'
const useForm = () => {
	const {user, setUser, setErrors} = useGlobalContext()
 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, formType: FormType ) => {
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

export {useForm}