import React from 'react'

function Footer() {
    const year= new Date().getFullYear();
  return (
    <footer className='bg-[#182B5C] py-5 text-white '>
        <p className='text-center'>&copy; {year}. ExpenseTracka. All rights are reserved. Build by DeveloperYegon</p>
    </footer>
  )
}

export default Footer