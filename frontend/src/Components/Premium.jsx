import React from 'react'

function Premium() {
  return (
    <main className='bg-[#182B5C] m-3 h-[50vh]'>
        <section className='grid grid-cols-3 gap-5 p-5'>
            <div className='bg-white h-full p-5 rounded-2xl hover:translate-y-10'>
                <h2 className='text-center'>**Free Trial**</h2>
                <hr className='h-1 w-[80%] m-auto'/>
                <div className='bg-gray-200 p-4 m-4 rounded-xl flex flex-col'>
                    <h3 className='text-center'>features</h3>
                <hr className='h-1 w-[80%] m-auto bg-black'/>

                    
                    <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <button className='bg-green-500 p-2 rounded-2xl'>Subscribe</button>

                </div>
            </div>
            <div className='bg-white h-full p-5 rounded-2xl hover:translate-y-10'>
                <h2 className='text-center'>**Monthly Subscription**</h2>
                <hr className='h-1 w-[80%] m-auto'/>

                <div className='bg-gray-200 p-4 m-4 rounded-xl flex flex-col'>
                <h3 className='text-center'>features</h3>
                <hr className='h-1 w-[80%] m-auto bg-black'/>

                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>

                <button className='bg-green-500 p-2 rounded-2xl'>Subscribe</button>

                </div>
            </div>
            <div className='bg-white h-full p-5 rounded-2xl hover:translate-y-10'>
                <h2 className='text-center'>**Yearly Subscription**</h2>
                <hr className='h-1 w-[80%] m-auto'/>

                <div className='bg-gray-200 p-4 m-4 rounded-xl flex flex-col'>
                <h3 className='text-center'>features</h3>
                <hr className='h-1 w-[80%] m-auto bg-black'/>

                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <button className='bg-green-500 p-2 rounded-2xl'>Subscribe</button>

                </div>
            </div>
        </section>
    </main>
  )
}

export default Premium