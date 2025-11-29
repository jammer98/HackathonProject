import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './componets/Home.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPgae.jsx';
import BidderDashboard from './Pages/BidderDashboard.jsx';
import GovernmentDashboard from './Pages/GovernmentDashboard.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<BidderDashboard />} />
      <Route path="/government" element={<GovernmentDashboard />} />
    </Routes>
    </>
  )
}

export default App
