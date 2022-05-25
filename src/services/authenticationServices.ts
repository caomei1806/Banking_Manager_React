import axios from 'axios'
import {User} from '../types'
const API_URL = 'https://kg-banking-manager.herokuapp.com/api/v1/auth'

const register = async (user: User) => {
	return await axios.post(
		`${API_URL}/register`, 
		{
			name: user.name,
			email: user.email,
			password: user.password
		}
		)
}

const login = async (email: String, password: String) => {
	try{
		return await axios.post(
		`${API_URL}/login`,
		{
			email: email,
			password: password
		}
	)
	}
	catch(e){
		return e
	}
	
}
const logout = (user: User) => {
	return axios.delete(
		`${API_URL}/logout`
	)
}

export {register, login, logout}