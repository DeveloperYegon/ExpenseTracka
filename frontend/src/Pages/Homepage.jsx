import React from 'react'
import Hero from '../Components/Hero'
import Premium from '../Components/Premium'
import Explainer from "../Components/Explainer"
import Newsletter from '../Components/Newsletter'
import Login from './Login'

function Homepage() {
  return (
    <main className=''>
        <hr className='bg-black h-1 w-[70%] my-4 m-auto'/>
        <section>
          <Hero/>
        </section>
        <section className='m-3 border py-20 px-10 h-[100vh] text-black rounded-xl bg-gradient-to-r from-customBlue to-customGreen'>

        <p className='text-center text-6xl '> We believe that financial management should be simple, transparent, and accessible to everyone.</p>
            <p className='text-left text-3xl'>
                 Our mission is to provide a powerful yet user-friendly tool to help you take control of your finances, track your expenses, and achieve your financial goals.
                    </p> 
                 <p className='text-left text-3xl'>
                    Whether you are a student, a professional, or a retiree, ExpenseTracka is here to help you manage your money and make informed financial decisions. 
                        </p>
                    <p className='text-center text-2xl'>
                        Sign up today and start your journey to financial freedom!</p>
        </section>

      <Explainer/>

       <Premium/>


      <Newsletter/>

     
    </main>
  )
}

export default Homepage