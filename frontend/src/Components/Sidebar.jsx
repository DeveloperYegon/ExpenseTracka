import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className='p-4'>
      <ul>
        <li className='mb-4'>
          <Link to="/savings" className='text-blue-500 hover:text-blue-700'>Savings</Link>
        </li>
        {/* <li className='mb-4'>
          <Link to="/profile" className='text-blue-500 hover:text-blue-700'>Profile</Link>
        </li>
        <li className='mb-4'>
          <Link to="/settings" className='text-blue-500 hover:text-blue-700'>Settings</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Sidebar;
