import React from 'react'

function About() {
  return (
    <main className='h-full'>
        <hr className='bg-black h-1 w-[70%] my-4 m-auto'/>
        <section className='m-5 border py-10 px-5 text-white rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[100vh] text-8xl flex flex-col items-center'>
            <p className='text-center text-xl '>
            ExpenseTracka was born out of the need for a better way to manage personal and business finances. 
                </p>
            <p className='text-center text-xl '>
                We noticed that many existing tools were either too complex or too limited in functionality. Our goal was to create an expense tracker that strikes the perfect balance – offering advanced features while remaining easy to use for everyone, regardless of their financial expertise.

                </p>
            <p className='text-center text-xl '>
                At ExpenseTracka, we believe that financial management should be simple, transparent, and accessible to everyone. We provide a powerful yet user-friendly tool to help you take control of your finances, track your expenses, and achieve your financial goals. Whether you are a student, a professional, or a retiree, ExpenseTracka is here to help you manage your money and make informed financial decisions. 
            </p>
                <p className='text-center text-xl '>
                    Sign up today and start your journey to financial freedom!


            </p>
      
        </section>

        <section className='m-5 border py-10 h-[100vh] px-5 text-white rounded-xl  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
         <p className='text-center text-2xl p-3'>What we offer</p>
         <hr className='bg-white w-[50%] m-auto'/>
         <ul class="text-center">
               <li className='text-center text-xl'><p className='text-center text-xl'><strong>Comprehensive Expense Tracking: </strong></p>Easily log and categorize your expenses to gain insights into your spending habits.</li>
               <li className='text-center text-xl'><p className='text-center text-xl'><strong>Income Management: </strong></p>Keep track of your income sources and monitor your financial health.</li>
               <li className='text-center text-xl'><p><strong>Customizable Reports:</strong></p> Generate detailed reports to understand your financial situation better and make informed decisions.</li>
               <li ><p><strong>User-Friendly Interface: </strong></p>Our intuitive design ensures that you can navigate and use all features effortlessly.</li>
               <li className='text-center text-xl'> <p><strong>Data Security:</strong></p> We prioritize your privacy and ensure that your data is securely stored and protected.</li>
            </ul>
            
            
            
            
           

        </section>



    </main>
  )
}

export default About