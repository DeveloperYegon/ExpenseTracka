import React from 'react'

function Newsletter() {
  return (
    <main className='h-[100vh] bg-gradient-to-r from-customBlue to-customGreen mx-3 my-20 p-10 '>
      <h2 className='text-center text-5xl my-10'>Subscribe to our newsletter today</h2>
      <hr  className='w-[30%] m-auto bg-black '/>
      <br />
        <p className='text-center text-2xl m-5'>Get the latest news and updates on our product and services</p>
        <form noValidate className='w-1/2 m-auto p-5 flex rounded-xl flex-col border'>
            <input autoFocus className='border p-2 m-5 text-black' type="email" placeholder='Enter your email'/>
            <div className='flex  px-5'>
            <input type="checkbox" /> 
            <p>I consent to receive emails on this product.</p>
            </div>
            <input className="bg-red-500 rounded-xl p-2" type="button" value="Subscribe" />
          
        </form>
    </main>
  )
}

export default Newsletter