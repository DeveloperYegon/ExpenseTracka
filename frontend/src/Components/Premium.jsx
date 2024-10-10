import React from 'react'
import { Link } from 'react-router-dom'

function Premium() {
  return (
    <main className='bg-[#fff] mx-3 my-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 '>

        <section className='md:grid md:grid-cols-3 flex  flex-col gap-5  p-5'>
            <div className='bg-white  border border-slate-200 p-5 rounded-2xl'>
                <h2 className='text-center'>**Free Trial**</h2>
                <hr className='h-1 w-[80%] m-auto'/>
                <div className='bg-gray-200 p-4 m-4 rounded-xl flex flex-col'>
                    <h3 className='text-center'>Features</h3>
                <hr className='h-1 w-[80%] m-auto bg-black'/>

                    
                    <ul className='flex flex-col items-center'>
                        <li className='p-3'>Security and Privacy</li>
                        <li className='p-3'>Analytics and Reporting</li>
                        <li className='p-3'>Goal Setting and Tracking</li>
                    </ul>
                <button className='bg-green-500 p-2 rounded-2xl'><Link to='/login'>Subscribe</Link></button>

                </div>
            </div>
            <div className='bg-white h-full p-5 rounded-2xl border border-slate-200'>
                <h2 className='text-center'>**Monthly Subscription**</h2>
                <hr className='h-1 w-[80%] m-auto'/>

                <div className='bg-gray-200 p-4 m-4 rounded-xl flex flex-col'>
                <h3 className='text-center'>Features</h3>
                <hr className='h-1 w-[80%] m-auto bg-black'/>

                <ul className='flex flex-col items-center'>
                    <li className='p-3'>Goal Setting and Tracking</li>
                    <li className='p-3'>Comprehensive Financial Tracking</li>
                    <li className='p-3'>Advanced Budgeting Tools</li>
                </ul>

                <button className='bg-green-500 p-2 rounded-2xl'>
                    <Link to='/login'>Subscribe</Link></button>

                </div>
            </div>
            <div className='bg-white h-full p-5 rounded-2xl border border-slate-200'>
                <h2 className='text-center'>**Yearly Subscription**</h2>
                <hr className='h-1 w-[80%] m-auto'/>

                <div className='bg-gray-200 p-4 m-4 rounded-xl flex flex-col'>
                <h3 className='text-center'>Features</h3>
                <hr className='h-1 w-[80%] m-auto bg-black'/>

                <ul className='flex flex-col items-center'>
                    <li className='p-3'>AI and Automation</li>
                    <li className='p-3'>Collaboration Features</li>
                    <li className='p-3'>Cross-Platform Compatibility</li>
                </ul>
                <button className='bg-green-500 p-2 rounded-2xl'><Link to='/login'>Subscribe</Link></button>

                </div>
            </div>
        </section>
    </main>
  )
}

export default Premium