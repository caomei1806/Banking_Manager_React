import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/shared/Nav'
import Login from './components/authComponents/Login'
import Register from './components/authComponents/Register'
import AccountSetupForm from './components/accountSetupComponents/AccountSetupForm'

function App() {
	return (
		<Router>
			<div className='App'>
				<Nav />
				<main>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route
							path='/account-holder/account-setup'
							element={<AccountSetupForm />}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
