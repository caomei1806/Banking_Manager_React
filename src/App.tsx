import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/shared/Nav'
import Login from './components/authComponents/Login'
import Register from './components/authComponents/Register'
import AccountSetupForm from './components/accountSetupComponents/AccountSetupForm'
import CreateAccount from './components/accountSetupComponents/CreateAccount'
import Accounts from './components/Accounts'
import Transfer from './components/Transfer'
import Logout from './components/Logout'

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
						<Route
							path='/account-holder/create-bank-account'
							element={<CreateAccount />}
						/>
						<Route path='/account' element={<Accounts />} />
						<Route
							path='/account-holder/:id/transaction'
							element={<Transfer />}
						/>
						<Route path='/logout' element={<Logout />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
