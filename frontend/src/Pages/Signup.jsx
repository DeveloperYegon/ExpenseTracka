import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Signup() {
  // Destructure the form methods and states
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  // Hook to handle navigation
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState('');

  const [logins, setLogins] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3002/register', data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Registered successfully");
          setErrorMessages(""); // Clear error messages
         // Reset form fields
          reset();
          setTimeout(() => {
            // Redirect to a different page, e.g., '/'
            navigate('/'); 
          }, 2000);
        }else{
       
          setErrorMessages("Registration failed. Please try again.");
          

        }
      })
      .catch((err) => {
      //  alert("An error occurred during registration");
        setErrorMessages(err.response?.data?.message || 'An unexpected error occurred');
        console.log(err);
      });
  }

  return (
    <main className='md:m-5 m-2 bg-[#182B5C] p-2 md:p-5 h-[100vh] '>
      <section className='border md:m-5 rounded-xl bg-white border-slate-950 h-full md:p-4'>
      {errorMessages && (
                <div id="authmessage" style={{ color: 'red' }}>
                    {errorMessages}
                </div>
            )}

        <p className='text-center text-[#ED7D3B] p-3 text-2xl'>Register Admin</p>
        <hr className='h-1 bg-black w-6m-auto' />

        {/* Admin login form */}
        <form className='border border-slate-950 md:m-4 m-1 md:p-4 rounded flex flex-col' onSubmit={handleSubmit(onSubmit)} noValidate>


          <div className='w-full flex  justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>
            <label className='p-4' htmlFor="name">Name:</label>
            <input
              className='p-2 border border-slate-600 rounded-xl'
              type="text"
              id="name"
              value={logins.name}
              {...register("name", {
                required: "Name is required"
              })}
              onChange={(e) => setLogins({ ...logins, name: e.target.value })}
            />
            </div>
            <p className='text-red-500 text-left text-[12px]'> {errors.name?.message}</p>
          </div>

          <div className='w-full flex  justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>

            <label className='p-4' htmlFor="email">Email:</label>
            <input
              className='p-2 border border-slate-600 rounded-xl'
              type="email"
              id="email"
              value={logins.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })}
              onChange={(e) => setLogins({ ...logins, email: e.target.value })}
            />
            </div>
            <p className='text-red-500 text-left text-[12px]'> {errors.email?.message}</p>
          </div>

          <div className='w-full flex  justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-1 items-center'>

            <label className='py-4' htmlFor="password">Password:</label>
            <input
              className='p-2 border border-slate-600 rounded-xl'
              type="password"

              id="password"
              value={logins.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
              onChange={(e) => setLogins({ ...logins, password: e.target.value })}
            />
            </div>
            <p className='text-red-500 text-left text-[12px]'> {errors.password?.message}</p>
          </div>

          <div className='flex  justify-around items-center'>
            <input className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Submit" />
          </div>
        </form>
      </section>
    </main>
  )
}


export default Signup;