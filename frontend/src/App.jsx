import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import Expenses from './Pages/Expenses';
import Savings from './Pages/Savings';
import Budget from './Pages/Budget';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Standalone routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
        {/* Dashboard route with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="savings" element={<Savings />} />
          <Route path="budget" element={<Budget />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
