import React from 'react';
import { Outlet, Link,useNavigate } from 'react-router-dom';
import hero from '../assets/expense hero.png'
import axios from 'axios';
import { useEffect } from 'react';


const Dashboard = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if no token is found
      return;
    }

    // Make an authenticated request to verify the token
    axios.get('http://localhost:3003/protected-route', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // Handle success response
      console.log('Access granted to protected route:', response.data);
    })
    .catch(error => {
      // If there’s an error, remove token and redirect to login
      console.error('Authentication failed:', error);
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

function logout() {
  localStorage.removeItem('token'); // Or use sessionStorage
  window.location.href = '/login';  // Redirect to the login page
}

  return (
<main className='h-full' >
<hr className='bg-black h-1 w-[70%] my-4 m-auto'/>
<section className='flex p-5 m-5 border'>

  
    <aside className='border'>
      <nav>
        <ul className='p-3'>
          <li className='bg-black my-3 text-white p-3 rounded-xl'><Link to="expenses">Expenses</Link></li>
          <li className='bg-black my-3 text-white p-3 rounded-xl'><Link to="savings">Savings</Link></li>
          <li className='bg-black my-3 text-white p-3 rounded-xl'><Link to="budget">Budget</Link></li>
          <li className='bg-black my-3 text-white p-3 rounded-xl cursor-pointer' onClick={logout}>Logout</li>
          
        </ul>
      </nav>
    </aside>
      
      {/* This is where the nested components will be rendered */}
      <div className='border mx-5 w-[100%]'>

      <Outlet />
      <img className="h-[400px] w-full" src={hero} alt="" />
      <h1></h1>
      </div>
</section>

    </main>
  );
};

export default Dashboard;
