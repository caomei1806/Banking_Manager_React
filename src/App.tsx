import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/shared/Nav'
import Login from './components/authComponents/Login'
import Register from './components/authComponents/Register'

function App() {
	return (
		<Router>
			<div className='App'>
				<Nav />
				<main>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
