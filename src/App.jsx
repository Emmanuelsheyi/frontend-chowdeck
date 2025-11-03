import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Restaurants from './pages/Restaurants.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/LoginPage.jsx'
import Signup from './pages/Signup.jsx'


function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<main style={{ padding: '2rem' }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/restaurants" element={<Restaurants />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
