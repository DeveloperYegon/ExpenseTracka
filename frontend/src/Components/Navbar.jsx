import React  from 'react'
import { Link } from 'react-router-dom'
// import Login from '../Pages/Login'


function Navbar() {

  return (
    <header className='py-5 sticky top-0 border bg-white'>
        <nav className='  flex flex-row  justify-around items-center'>
            <Link to="/">
            <h1 className='text-xl text-[#064195]'>ExpenseTracka</h1>
            </Link>
            <ul className='flex flex-row'>
                <Link to="/">
                <li className='p-3 text-xl hover:text-[#064195]'>Home</li>
                </Link>
                <Link to="/about">
                <li className='p-3 text-xl hover:text-[#064195]'>AboutUs</li>
                </Link>
                <Link to="/contact">
                <li className='p-3 text-xl hover:text-[#064195]'>Contact</li>
                </Link>
            </ul> 
            <div  className='bg-red-500 rounded-xl p-2 text-black'> 
            <Link to="/login">Expenses</Link>
             </div>
        </nav>
       </header>
  )
}

export default Navbar