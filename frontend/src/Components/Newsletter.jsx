import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

function Newsletter() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate(); // Hook to handle navigation


  const onSubmit = async (data) => {

    const formData = new FormData();
    
    formData.append('email', data.email);
    formData.append('terms', data.terms);
try {
  const response= await axios.post('http://localhost:3003/newsletter', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
    if (response.status === 200) {
      alert("Newsletter registration successful");
      reset();
      setErrorMessages('');
      setTimeout(() => {
        navigate('/contact');
      }, 2000);
    }
    else {
      setErrorMessages("Registration  failed. Please try again.");
    }
  
}catch(err)  {
        console.log(err);
        setErrorMessages('Server Error. Please try again');
      };
  };
  return (
    <main className='h-[100vh] bg-gradient-to-r from-customBlue to-customGreen mx-3 my-20 p-10 '>
      <h2 className='text-center text-5xl my-10'>Subscribe to our newsletter today!!</h2>
      <hr  className='w-[30%] m-auto bg-black '/>
      <br />
      {errorMessages && (
              <div id="authmessage" className='text-red-600   text-center'>
                {errorMessages}
              </div>
            )}

      
        <p className='text-center text-2xl m-5'>Get the latest news and updates on our product and services</p>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className='border p-5 rounded-xl'>

          <div  className='w-full flex justify-around flex-col items-center border border-slate-200  p-2 my-3'>
            <div className='flex flex-row gap-2 items-center'>
            <input className='p-2 border border-slate-600 rounded-xl autoFocus ' type="email" placeholder='Enter your email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              }
            })}/>

            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.email?.message}</p>
          </div>
          <div className='w-full flex items-center flex-col p-5   border border-slate-200 '>
            <div>
            <input type="checkbox" id="term"
              {...register("terms", { required: "You must agree to Terms" })}
            name="terms"/> &nbsp;&nbsp;
              <label htmlFor="term">
              I consent to receive emails on this product.
              </label>
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.terms?.message}</p>
          </div>
          <div className='flex justify-around items-center'>

          <input className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Subscribe" />
          </div>
          
        </form>
    </main>
  )
}

export default Newsletter