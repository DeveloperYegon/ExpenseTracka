import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
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
        </ul>
      </nav>
    </aside>
      
      {/* This is where the nested components will be rendered */}
      <div className='border mx-5 w-[100%]'>

      <Outlet />
      <h1>sss</h1>
      </div>
</section>

    </main>
  );
};

export default Dashboard;
