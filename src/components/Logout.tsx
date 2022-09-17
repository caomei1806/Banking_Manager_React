import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { Role } from '../types/enums'
const API_URL = 'http://localhost:5000/api/v1'

const Logout = () => {
	const { setUser } = useGlobalContext()
	const navigate = useNavigate()
	const logout = async () => {
		await axios.delete(`${API_URL}/auth/logout`, { withCredentials: true })
	}
	useEffect(() => {
		logout()
		setUser({ id: 0, name: '', email: '', password: '', role: Role.user })
		navigate('/login')
	}, [])
	return <div></div>
}

export default Logout
